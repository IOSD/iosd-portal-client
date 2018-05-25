let initState = {
   panelTitles: [
       "course-portal","iosd-course-portal", "course-portal-disabled"
   ]
}

export const indexReducer = (state=initState, action) => {
    switch(action){
        case "TEST":
            //Modify state here
            break;
    }
    return state;
};
