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
    private getCookie(name: string) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    private setCookie(name: string, value: string) {
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
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
        this.setCookie("startcode", code.toString());
    }
    getStartCode(): number {
        let value = this.getCookie("startcode");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.StartCode;
    }

    setResetCode(code: number) {
        this.setCookie("resetcode", code.toString());
    }

    getResetCode(): number {
        let value = this.getCookie("resetcode");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.ResetCode;
    }

    setLeftCode(code: number) {
        this.setCookie("lcode", code.toString());
    }
    getLeftCode(): number {
        let value = this.getCookie("lcode");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.LCode;
    }

    setRightCode(code: number) {
        this.setCookie("rcode", code.toString());
    }

    getRightCode(): number {
        let value = this.getCookie("rcode");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.RCode;
    }

    setTimer(timer: number) {
        this.setCookie("timer", timer.toString());
    }

    getTimer(): number {
        let value = this.getCookie("timer");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.Timer;
    }

    setTimer2(timer: number) {
        this.setCookie("timer2", timer.toString());
    }

    getTimer2(): number {
        let value = this.getCookie("timer2");
        if (value !== undefined) {
            return Number.parseInt(value);
        }
        return defaultVal.Timer2;
    }
}
export default Prefs;