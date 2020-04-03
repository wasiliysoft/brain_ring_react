export class defaultVal {
    static readonly LCode = 37;
    static readonly RCode = 39;
    static readonly StartCode = 107;
    static readonly ResetCode = 46;
    static readonly Timer = 60;
    static readonly Timer2 = 20;
}

class Prefs {


    // возвращает куки с указанным name,
    // или undefined, если ничего не найдено
    private getValue(name: string): string | undefined {
        if (localStorage === undefined) { // IE11 offline mode
            let matches = document.cookie.match(new RegExp(
                "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
            ));
            return matches ? decodeURIComponent(matches[1]) : undefined;
        } else {
            let val = localStorage.getItem(name);
            return val ? val : undefined;
        }
    }

    private setValue(name: string, value: string) {
        if (localStorage === undefined) { // IE11 offline mode
            document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        } else {
            localStorage.setItem(name, value);
        }

    }

    restoreDefault() {
        this.setLeftCode(defaultVal.LCode);
        this.setRightCode(defaultVal.RCode);
        this.setStartCode(defaultVal.StartCode);
        this.setResetCode(defaultVal.ResetCode);
        this.setTimer(defaultVal.Timer);
        this.setTimer2(defaultVal.Timer2);
    }

    setStartCode(code: number) {
        this.setValue("startcode", code.toString());
    }
    getStartCode(): number {
        let value = this.getValue("startcode");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.StartCode;
    }

    setResetCode(code: number) {
        this.setValue("resetcode", code.toString());
    }

    getResetCode(): number {
        let value = this.getValue("resetcode");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.ResetCode;
    }

    setLeftCode(code: number) {
        this.setValue("lcode", code.toString());
    }
    getLeftCode(): number {
        let value = this.getValue("lcode");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.LCode;
    }

    setRightCode(code: number) {
        this.setValue("rcode", code.toString());
    }

    getRightCode(): number {
        let value = this.getValue("rcode");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.RCode;
    }

    setTimer(timer: number) {
        this.setValue("timer", timer.toString());
    }

    getTimer(): number {
        let value = this.getValue("timer");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.Timer;
    }

    setTimer2(timer: number) {
        this.setValue("timer2", timer.toString());
    }

    getTimer2(): number {
        let value = this.getValue("timer2");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.Timer2;
    }
}
export default Prefs;