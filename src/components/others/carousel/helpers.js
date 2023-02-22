import Slide from "./Slide";

export function shiftRight(minPos, maxPos) {
    return function (element, index, array) {
        const leftPos = +element.style.left.replace("%", "");
        const newLeftPos = (leftPos - 100);

        if (newLeftPos === 0) {
            element.style.zIndex = 20;
        } else if (newLeftPos > minPos || newLeftPos < 100) {
            element.style.zIndex = 15;
        }
        else {
            element.style.zIndex = "initial";
        }


        if (newLeftPos < minPos) {
            element.style.left = maxPos + "%";
        } else {
            element.style.left = newLeftPos + "%";
        }
    };
};

export function shifLeft(minPos, maxPos) {
    return function (element, index, array) {
        const leftPos = +element.style.left.replace("%", "");
        const newLeftPos = (leftPos + 100);

        if (newLeftPos === 0) {
            element.style.zIndex = 20;
        } else if (newLeftPos === -100) {
            element.style.zIndex = "initial";
        } else {
            element.style.zIndex = 15;
        }



        if (newLeftPos > maxPos) {
            element.style.left = minPos + "%";
        } else {
            element.style.left = newLeftPos + "%";
        }
    }
}


export function setSlides() {
    /*  
        helps set up the slides so the first slide that appears on screen is the mid slide
        eg: instead of |[1]|[2][3][4] -> [1][2]|[3]|[4]
        so shifting the slides to any direction when clicked can be easier and possible
    */

    let afterMidStyle = { top: "0%", left: "0%", zIndex: "initial" };
    let beforeMidStyle = { top: "0%", left: "0%", zIndex: "initial" };

    return function (item, index, array, ...others) {
        const arrLength = array.length;
        const midPoint = Math.floor((arrLength / 2));

        if (index === 0) {
            // this helps so the point on the left from mid point is ascending order of negative value
            //eg: -200 -100 0 instead of -100 -200 0
            beforeMidStyle = { top: "0%", left: ((midPoint + 1) * -100) + "%", zIndex: "initial" }
        }

        if (index < midPoint) {
            const newLeft = +beforeMidStyle.left.replace("%", "") + 100;
            const zIndex = newLeft === -100 ? "15" : "initial";
            beforeMidStyle = { ...beforeMidStyle, left: (newLeft + "%"), zIndex: zIndex };
            return <Slide styles={beforeMidStyle} item={item} key={item.id} />
        } else if (index === midPoint) {
            return <Slide styles={{ top: "0%", left: "0%", zIndex: "20" }} item={item} key={item.id} />
        } else {
            const newLeft = +afterMidStyle.left.replace("%", "") + 100;
            afterMidStyle = { ...afterMidStyle, left: (newLeft + "%"), zIndex: "initial" }
            return <Slide styles={afterMidStyle} item={item} key={item.id} />
        }
    };
};
