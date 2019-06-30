// global event handler for expanding dropdowns
const expandHandler = function () {
    this.classList.toggle('active');
    this.nextElementSibling.classList.toggle('show');
}

// generate randomId for dropdownsreturn Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
const randomId = () => {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

// custom render function for coach info accordion
function _bindAccordion(name, bio, cellRef, $cell) {
    // grab template contents
    const $input = cellRef.querySelector('input');
    const $label = cellRef.querySelector('label');

    // assign template attributes and custom id's
    // so the label for will trigger the dropdown
    const dropdownID = randomId();
    $input.setAttribute('id', `accordion_${dropdownID}`);
    $label.setAttribute('for', `accordion_${dropdownID}`);
};