from flask import Flask, abort, render_template, request
import json
from pathlib import Path

app = Flask(__name__)
DATA_FILE = Path(__file__).parent / "data" / "lessons.json"


def load_lessons():
    with DATA_FILE.open(encoding="utf-8") as file:
        return json.load(file)


@app.route("/")
def index():
    lessons = load_lessons()
    query = request.args.get("q", "").strip().lower()

    if query:
        lessons = [
            lesson for lesson in lessons
            if query in lesson["title"].lower()
            or query in lesson["category"].lower()
            or query in lesson["description"].lower()
        ]

    categories = list(dict.fromkeys(
        lesson["category"] for lesson in load_lessons()
    ))
    return render_template(
        "index.html",
        lessons=lessons,
        categories=categories,
        query=request.args.get("q", "")
    )


@app.route("/lesson/<lesson_id>")
def lesson(lesson_id):
    lessons = load_lessons()
    selected = next(
        (item for item in lessons if item["id"] == lesson_id),
        None
    )

    if selected is None:
        abort(404)

    return render_template("lesson.html", lesson=selected, lessons=lessons)


@app.errorhandler(404)
def not_found(_error):
    return render_template("lesson.html", lesson=None, lessons=[]), 404


if __name__ == "__main__":
    app.run(debug=True)
