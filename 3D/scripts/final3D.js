function test(e) {
    const element = document.getElementById(e);
    if (element.rotation == "0,0,0,0") {
        element.rotation = `0,0.5,0,1.57`;
        let trans = element.translation;
        trans = trans.split(" ");
        element.lang = `${trans[0]} ${trans[1]} ${trans[2]}`;
        trans[0] -= 0.5;
        trans[2] = 1.2;
        element.translation = `${trans[0]} ${trans[1]} ${trans[2]}`;
    } else {
        element.rotation = `0,0,0,0`;
        element.translation = element.lang;
    }
}