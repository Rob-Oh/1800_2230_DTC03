//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {
    console.log($('#navbarPlaceholder').load('../templates/nav.html'));
    console.log($('#footerPlaceholder').load('../templates/bot_nav.html'));
}
loadSkeleton();  //invoke the function
