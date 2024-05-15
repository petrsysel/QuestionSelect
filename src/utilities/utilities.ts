function autogrow(element: HTMLElement){
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}
// function setrow