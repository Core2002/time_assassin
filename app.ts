class YearPanel {
    day_flag: number[]
    day_arr: number[][]
    day_date_arr: Date[][]

    constructor(day_flag: number[]) {
        this.day_flag = day_flag
        var lw = 7
        var ld = 53
        this.day_arr = new Array(ld)
        this.day_date_arr = new Array(ld)
        for (let i = 0; i < ld; i++) {
            this.day_arr[i] = new Array(7)
            this.day_date_arr[i] = new Array(7)
        }

        for (let iw = 0; iw < ld; iw++) {
            for (let id = 0; id < lw; id++) {
                if ((iw + 1) * lw + (id + 1) - this.day_flag[1] > this.day_flag[2]) {
                    this.day_arr[iw][id] = 1;
                    continue;
                }
                if (iw <= this.day_flag[1] / lw && id + 1 <= this.day_flag[1] % lw) {
                    this.day_arr[iw][id] = 0;
                } else {
                    this.day_arr[iw][id] = 2;
                    this.day_date_arr[iw][id] = addDay(new Date(day_flag[0] + "-01-01"), lw * iw + id);
                }
            }
        }

    }

    print_year_panel_l() {
        var res = ""
        res += "--- " + this.day_flag[0] + " ---\n"
        for (let id = 0; id < this.day_arr[0].length; id++) {
            for (let iw = 0; iw < this.day_arr.length; iw++) {
                res += this.day_arr[iw][id]

                if (this.day_arr[iw][id] == 0 || this.day_arr[iw][id] == 1) {
                    addWhiteBlock()
                } else if (this.day_arr[iw][id] == 2) {
                    addBlock(this.day_date_arr[iw][id])
                }
            }
            res += "\n"
            addBr()
        }
        console.log(res)
    }
}

var y2018 = new YearPanel([2018, 1, 365])
y2018.print_year_panel_l()


function addBr() {
    addEle("<br>")
}

function addBlock(dateTitle: Date) {
    addEle("<button title=\"" + dateTitle + "\" onclick=\"xwx(this)\" type=\"button\" class=\"layui-btn layui-btn-xs\" style=\"background-color: darkgrey;padding: 15;margin: 2px;\">...</button>")
}

function addWhiteBlock() {
    addEle("<button type=\"button\" class=\"layui-btn layui-btn-xs\" style=\"background-color: white;padding: 15;margin: 2px;\">...</button>")
}

function addEle(html: string) {
    const box = document.getElementById('qwq');
    box!.innerHTML = box!.innerHTML + html
}


function xwx(el: Element) {
    if (el.getAttribute("d") == "3") {
        el.setAttribute("d", "2")
        el.setAttribute("style", "background-color: darkgrey;margin: 2px;")
    } else {
        el.setAttribute("d", "3")
        el.setAttribute("style", "background-color: green;margin: 2px;")
    }
}

function addDay(dt: Date, dn: number) {
    var d = new Date(dt.getTime() + dn * 24 * 60 * 60 * 1000)
    console.log(d)
    return d
}