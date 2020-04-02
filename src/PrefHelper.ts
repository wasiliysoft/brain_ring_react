class Prefs {


    setLeftCode(code: number) {
        localStorage.setItem("lcode", code.toString());
    }
    getLeftCode(): number {
        let value = localStorage.getItem("lcode");
        if (value !== null) {
            return Number.parseInt(value);
        }
        return 81;
    }

    setRightCode(code: number) {
        localStorage.setItem("rcode", code.toString());
    }

    getRightCode(): number {
        let value = localStorage.getItem("rcode");
        if (value !== null) {
            return Number.parseInt(value);
        }
        return 87;
    }

    setTimer(timer: number) {
        localStorage.setItem("timer", timer.toString());
    }

    getTimer(): number {
        let value = localStorage.getItem("timer");
        if (value !== null) {
            return Number.parseInt(value);
        }
        return 60;
    }

}
export default Prefs;