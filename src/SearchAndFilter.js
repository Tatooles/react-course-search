class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    // Courses we display will begin empty, any relevant courses will be added
    let filteredCourses = [];

    // Course must fulfill all the following criteria in order to be displayed
    courses.forEach(course => {
      if((subject === "All" || course.subject === subject)
       && (minimumCredits === "" || course.credits >= minimumCredits)
       && (maximumCredits === "" || course.credits <= maximumCredits)
       && (search === "" || this.checkSearch(course, search))){
        filteredCourses.push(course);
      }
    });

    return filteredCourses;
  }

  checkSearch(course, search){
    // Return true or false for whether any keyword of the course contains the search string
    let flag = false;
    for(let keyword of course.keywords){
      if(keyword.includes(search.trim())){
        flag = true;
      }
    }
    return flag;
  }
}

export default SearchAndFilter;
