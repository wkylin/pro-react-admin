#!/usr/bin/env python3
"""Build lazy-loaded chapter data from public-domain Project Gutenberg texts.

The checked-in JSON is the runtime artifact. To regenerate it without cached
downloads, run this script; it fetches the official UTF-8 plain-text files.
Use --source-dir PATH to parse pg<id>.txt files already downloaded there.
"""

import argparse
import json
import re
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "src/pages/reading/texts"
BOOKS = {
    "journey": (23962, "西遊記", 100),
    "three-kingdoms": (23950, "三國志演義", 120),
    "liaozhai": (51828, "聊齋志異", 100),
    "art-of-war": (23864, "孫子兵法", 13),
}
NOVEL_HEADING = re.compile(r"^第[一二三四五六七八九十百○〇零0-9]{1,5}回")
WAR_HEADING = re.compile(r"^[\u4e00-\u9fff]{2,6}第[一二三四五六七八九十百○〇零0-9]+$")
STORY_HEADING = re.compile(r"^〈([^〉]+)〉(（[^）]+）)?$")


def body_of(source: str) -> str:
    begin = re.search(r"\*\*\* START OF THE PROJECT GUTENBERG EBOOK[^\n]*\*\*\*", source)
    end = re.search(r"\*\*\* END OF THE PROJECT GUTENBERG EBOOK", source)
    if not begin or not end:
        raise ValueError("Project Gutenberg start/end markers were not found")
    return source[begin.end() : end.start()].strip()


def clean_paragraphs(lines: list[str]) -> str:
    paragraphs: list[str] = []
    current: list[str] = []
    for line in lines:
        line = line.strip()
        if line:
            current.append(line)
        elif current:
            paragraphs.append("".join(current))
            current = []
    if current:
        paragraphs.append("".join(current))
    return "\n\n".join(paragraphs)


def parse_headings(body: str, pattern: re.Pattern[str]) -> list[dict[str, str]]:
    chapters: list[dict[str, str]] = []
    title: str | None = None
    lines: list[str] = []
    for raw in body.splitlines():
        line = raw.strip()
        if pattern.match(line):
            if title is not None:
                chapters.append({"title": title, "text": clean_paragraphs(lines)})
            title = re.sub(r"\s+", " ", line)
            lines = []
        elif title is not None:
            lines.append(raw)
    if title is not None:
        chapters.append({"title": title, "text": clean_paragraphs(lines)})
    return chapters


def parse_liaozhai(body: str) -> list[dict[str, str]]:
    stories: list[dict[str, str]] = []
    title: str | None = None
    lines: list[str] = []
    for raw in body.splitlines():
        match = STORY_HEADING.match(raw.strip())
        if match:
            if title is not None:
                stories.append({"title": title, "text": clean_paragraphs(lines)})
            title = match.group(1) + (match.group(2) or "")
            lines = []
        elif title is not None:
            lines.append(raw)
    if title is not None:
        stories.append({"title": title, "text": clean_paragraphs(lines)})
    if len(stories) != 497:
        raise ValueError(f"Expected all 497 Liaozhai stories; found {len(stories)}")
    return [
        {
            "title": f"第{index // 5 + 1}辑 · {group[0]['title']}",
            "text": "\n\n".join(f"〈{story['title']}〉\n\n{story['text']}" for story in group),
        }
        for index in range(0, len(stories), 5)
        if (group := stories[index : index + 5])
    ]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source-dir", type=Path)
    args = parser.parse_args()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for slug, (ebook_id, title, expected) in BOOKS.items():
        if args.source_dir:
            source = (args.source_dir / f"pg{ebook_id}.txt").read_text(encoding="utf-8")
        else:
            url = f"https://www.gutenberg.org/cache/epub/{ebook_id}/pg{ebook_id}.txt"
            with urlopen(url, timeout=60) as response:
                source = response.read().decode("utf-8")
        body = body_of(source)
        if slug == "liaozhai":
            chapters = parse_liaozhai(body)
        else:
            pattern = WAR_HEADING if slug == "art-of-war" else NOVEL_HEADING
            chapters = parse_headings(body, pattern)
        if len(chapters) != expected or any(len(chapter["text"]) < 30 for chapter in chapters):
            raise ValueError(f"{title}: expected {expected} complete chapters; found {len(chapters)}")
        payload = {"title": title, "source": f"https://www.gutenberg.org/ebooks/{ebook_id}", "chapters": chapters}
        path = OUTPUT / f"{slug}.json"
        path.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
        print(f"{title}: {len(chapters)} reading sections, {path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
