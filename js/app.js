/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const VALUE = 150;
const navList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section[data-nav]");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const createNavItem = (sectionId, sectionName) => {
  const listElement = document.createElement("li");
  const linkElement = document.createElement("a");
  linkElement.className = `menu__link ${sectionId}`;

  const navText = document.createTextNode(sectionName);
  linkElement.appendChild(navText);
  listElement.appendChild(linkElement);
  navList.appendChild(listElement);
};

// add active class for "menu__link" and section
const makeActive = () => {
  for (const section of sections) {
    // get the "menu__link" that point to the section by the id added before
    const activeLink = document.querySelector(
      `.menu__link.${section.getAttribute("id")}`
    );

    const box = section.getBoundingClientRect();
    if (box.top <= VALUE && box.bottom >= VALUE) {
      section.classList.add("active");
      activeLink.classList.add("active");
    } else {
      section.classList.remove("active");
      activeLink.classList.remove("active");
    }
  }
};

// credit to https://stackoverflow.com/a/28222246/11309214
// get offset to use in window.scrollTo
function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

sections.forEach((section) => {
  createNavItem(section.getAttribute("id"), section.getAttribute("data-nav"));
});

// Add class 'active' to section when near top of viewport
document.addEventListener("scroll", (event) => {
  makeActive();
});

// Scroll to anchor ID using scrollTO event
const menuLinks = document.getElementsByClassName("menu__link");
for (const link of menuLinks) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const attributeValue = e.target.innerHTML;

    // get section by attribute value
    const section = document.querySelector(
      `section[data-nav='${attributeValue}']`
    );

    const elementOffset = getOffset(section);
    window.scrollTo({
      left: elementOffset.left,
      top: elementOffset.top,
      behavior: "smooth",
    });
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */
