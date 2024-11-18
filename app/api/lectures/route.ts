import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import type { Lecture } from "@/types/lecture";

export async function GET() {
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

  console.log(JSON.stringify(lectures, null, 2));

  return NextResponse.json(
    lectures.map((lecture) => ({
      classroom: lecture.classroom,
      class: lecture.class,
      time: lecture.time,
      instructor: lecture.instructor,
      className: lecture.className,
      imgSrc: lecture.imgSrc,
      classType: lecture.classType,
      zoomLink: lecture.zoomLink,
    })),
  );
}
