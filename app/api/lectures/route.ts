import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import type { Lecture } from "@/types/lecture";

let cachedData: Lecture[] | null = null;
let lastUpdated = 0;
const CACHE_DURATION = 1000 * 60 * 5;
const isDevelopment = false;

async function fetchAndProcessLectures(): Promise<Lecture[]> {
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
    if (classroomName && zoomLink) {
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

  return lectures;
}

export async function GET() {
  const now = Date.now();

  if (isDevelopment) {
    const mockResponse = await fetch("http://localhost:3000/mocks/data.json");
    const mockData: Lecture[] = await mockResponse.json();
    return NextResponse.json(mockData, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  }

  if (cachedData && now - lastUpdated < CACHE_DURATION) {
    return new NextResponse(JSON.stringify(cachedData), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    });
  }

  try {
    const freshData = await fetchAndProcessLectures();
    cachedData = freshData;
    lastUpdated = now;

    return new NextResponse(JSON.stringify(freshData), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    if (cachedData) {
      return new NextResponse(JSON.stringify(cachedData), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
        },
      });
    }

    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch or process data." }),
      { status: 500 },
    );
  }
}
