class Prefs {

    restoreDefault() {
        localStorage.clear();
    }
    setStartCode(code: number) {
        localStorage.setItem("startcode", code.toString());
    }
    getStartCode(): number {
        try {
            let value = localStorage.getItem("startcode");
            if (value !== null) {
                return Number.parseInt(value);
            }
        } catch (e) { }
        return 107;
    }

    setResetCode(code: number) {
        localStorage.setItem("resetcode", code.toString());
    }
    getResetCode(): number {
        try {
            let value = localStorage.getItem("resetcode");
            if (value !== null) {
                return Number.parseInt(value);
            }
        } catch (e) { }
        return 8;
    }

    setLeftCode(code: number) {
        localStorage.setItem("lcode", code.toString());
    }
    getLeftCode(): number {
        try {
            let value = localStorage.getItem("lcode");
            if (value !== null) {
                return Number.parseInt(value);
            }
        } catch (e) { }
        return 37;
    }

    setRightCode(code: number) {
        localStorage.setItem("rcode", code.toString());
    }

    getRightCode(): number {
        try {
            let value = localStorage.getItem("rcode");
            if (value !== null) {
                return Number.parseInt(value);
            }
        } catch (e) { }
        return 39;
    }

    setTimer(timer: number) {
        localStorage.setItem("timer", timer.toString());
    }

    getTimer(): number {
        try {
            let value = localStorage.getItem("timer");
            if (value !== null) {
                return Number.parseInt(value);
            }
        } catch (e) { }
        return 60;
    }

    setTimer2(timer: number) {
        localStorage.setItem("timer2", timer.toString());
    }

    getTimer2(): number {
        try {
            let value = localStorage.getItem("timer2");
            if (value !== null) {
                return Number.parseInt(value);
            }
        } catch (e) { }
        return 20;
    }
}
export default Prefs;