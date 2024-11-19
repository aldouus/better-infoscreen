import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import type { Lecture } from "@/types/lecture";

type CachedData = {
  lectures: Lecture[];
  zoomLinks: Record<string, string>;
};

let cachedData: CachedData | null = null;
let lastUpdated = 0;
const CACHE_DURATION = 1000 * 60 * 5;
const isDevelopment = false;

async function fetchAndProcessLectures(): Promise<CachedData> {
  const response = await fetch("https://infoscreen.sae.ch/");
  const html = await response.text();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  const lectures: Lecture[] = [];
  const zoomLinks: Record<string, string> = {};

  const navigationLinks = Array.from(
    document.querySelectorAll(".navigation_display ul li a"),
  );
  for (const elem of navigationLinks) {
    const classroomName = elem.textContent?.trim() || "";
    const zoomLink = elem.getAttribute("href");
    if (classroomName && zoomLink && zoomLink.includes("zoom.us")) {
      zoomLinks[classroomName] = zoomLink;
    }
  }

  const unterrichtsBoxes = Array.from(
    document.querySelectorAll(".unterrichtsBox"),
  );
  for (const elem of unterrichtsBoxes) {
    const classImage =
      elem.querySelector(".saeIconsKlasse")?.getAttribute("src") || "";
    const classNameText =
      elem.querySelector(".unterrichtsBox_Klasse")?.textContent?.trim() || "";
    const classTimeAndRoom =
      elem.querySelector(".unterrichtsBox_Uhrzeit")?.textContent?.trim() || "";
    const classAndInstructor =
      elem
        .querySelector(".unterrichtsBox_UnterrichtUndDozent")
        ?.textContent?.trim() || "";

    const classDescription = classAndInstructor.replace(
      /\s*\((onCampus|hybrid|online)\s*$/,
      "",
    );
    const classDescriptionSplit = classDescription.split(" - ");
    const instructor = classDescription.split("·")[1]?.trim() || "";
    let classType = classDescription.split("(")[1]?.split(")")[0] || "Unknown";

    if (!["hybrid", "online", "onCampus"].includes(classType)) {
      classType = "Undefined";
    }

    const timeClassroomRegex = /^(.+?)\s*·\s*(.+)$/;
    const matchTimeClassroom = classTimeAndRoom.match(timeClassroomRegex);

    let time = "";
    let classroom = "";

    if (matchTimeClassroom) {
      time = matchTimeClassroom[1];
      classroom = matchTimeClassroom[2];
    }

    lectures.push({
      classroom,
      class: classDescriptionSplit[0].trim(),
      time,
      instructor,
      className: classNameText,
      imgSrc: classImage
        ? `https://infoscreen.sae.ch/${classImage}`
        : "https://placehold.co/200x200",
      classType,
      zoomLink: zoomLinks[classroom] || "",
    });
  }

  if (Object.keys(zoomLinks).length === 0) {
    throw new Error("No zoom links found in the response");
  }

  return { lectures, zoomLinks };
}

export async function GET() {
  const now = Date.now();

  if (isDevelopment) {
    const mockLinks = {
      "Albis": "https://sae.zoom.us/j/96194889062",
      "Bellevue": "https://sae.zoom.us/j/92284858572",
      // ... other mock links ...
    };
    return NextResponse.json(
      { lectures: [], zoomLinks: mockLinks },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      },
    );
  }

  if (
    cachedData &&
    now - lastUpdated < CACHE_DURATION &&
    Object.keys(cachedData.zoomLinks).length > 0
  ) {
    return NextResponse.json(cachedData, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    });
  }

  try {
    const data = await fetchAndProcessLectures();

    if (Object.keys(data.zoomLinks).length > 0) {
      cachedData = data;
      lastUpdated = now;
    }

    return NextResponse.json(data, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    if (cachedData && Object.keys(cachedData.zoomLinks).length > 0) {
      return NextResponse.json(cachedData, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
        },
      });
    }

    return NextResponse.json(
      { message: "Failed to fetch or process data." },
      { status: 500 },
    );
  }
}
