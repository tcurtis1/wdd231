export function setTitle(course) {
    document.querySelector("#courseName").textContent = course.name;
    document.querySelector("#courseCode").textContent = course.code;
  }
  
export function renderSections(sections) {
    if (!Array.isArray(sections)) {
        console.error("sections is not an array:", sections);
        return;
      }
    
    const html = sections.map(
      (section) => `<tr>
      <td>${section.sectionNumber}</td>
      <td>${section.enrolled}</td>
      <td>${section.instructor}</td></tr>`
    );
    document.querySelector("#sections").innerHTML = html.join("");
}