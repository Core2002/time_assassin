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
                if (iw * lw + id - this.day_flag[1] >= this.day_flag[2]) {
                    this.day_arr[iw][id] = 1;
                    continue;
                }
                if (iw <= this.day_flag[1] / lw && id + 1 <= this.day_flag[1] % lw) {
                    this.day_arr[iw][id] = 0;
                } else {
                    this.day_arr[iw][id] = 2;
                    this.day_date_arr[iw][id] = addDay(new Date(day_flag[0] + "-01-01"), lw * iw + id - this.day_flag[1]);
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


var yacc = getQueryVariable("year_acc")
var wbc = getQueryVariable("white_block_count")
if (!(yacc && wbc)) {
    yacc = "2018"
    wbc = "1"
}
var ydc = getDayCountByYear(parseInt(yacc))
var ypl = new YearPanel([parseInt(yacc), parseInt(wbc), ydc])
ypl.print_year_panel_l()


function addBr() {
    addEle("<br>")
}

function addBlock(dateTitle: Date) {
    addEle("<button title=\"" + dateTitle.toISOString().split("T", 1)[0] + "\" onclick=\"xwx(this)\" type=\"button\" class=\"layui-btn layui-btn-xs\" style=\"background-color: darkgrey;padding: 15;margin: 2px;\">...</button>")
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

function getDayCountByYear(year: number) {
    var i = 1
    var td = new Date(year.toString() + "-01-01")
    while ((td = addDay(td, 1)).getFullYear() == year) {
        i++
    }
    return i
}

function addDay(dt: Date, dn: number) {
    var d = new Date(dt.getTime() + dn * 24 * 60 * 60 * 1000)
    // console.log(d)
    return d
}

function clickBuild() {
    let dataMap = new Map();
    const qwq = document.getElementById('qwq')!;
    var tab = qwq.getElementsByTagName("button")
    for (let i = 0; i < tab!.length; i++) {
        var cn = tab!.item(i)!
        var title = (cn as HTMLElement).getAttribute("title")!
        var d = (cn as HTMLElement).getAttribute("d")!
        if (title != null && d == "3") {
            dataMap[title] = "1"
        }
    }
    const res = document.getElementById('res')!;
    res.innerHTML = JSON.stringify(dataMap, null, "    ")
    console.log(dataMap)

    var cb = new CommandBuider()
    for (const k in dataMap) {
        cb.set_data(k)
        cb.write_checkpoint(k)
        cb.commit("Feat: Add the checkpoint when " + k)
    }
    cb.push()
    cb.sync_data()
    const res_ps1 = document.getElementById('res-ps1')!;
    res_ps1.innerHTML = cb.toText()
}

class CommandBuider {
    my_commnd: Array<string>;

    constructor() {
        this.my_commnd = new Array()
        this.write_command("echo By NekokeCore")
        this.write_command("net start w32time")
    }

    write_command(command: string) {
        this.my_commnd.push(command)
    }

    write_checkpoint(data: string) {
        this.write_command("echo \"" + data + "\" >> checkpoint.log")
    }

    sync_data() {
        this.write_command("w32tm /resync")
    }

    set_data(data: string) {
        this.write_command("Set-Date \"" + data + " 11:45:14+08:00\"")
    }

    commit(commit_message: string) {
        this.write_command("git add .")
        this.write_command("git commit -m \"" + commit_message + "\"")
    }

    push() {
        this.sync_data()
        this.write_command("git push")
    }

    toText() {
        return this.my_commnd.join("\n")
    }

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return false;
}

function IMPJS(jsonString: string) {
    let obj = JSON.parse(jsonString);
    const qwq = document.getElementById('qwq')!;
    var tab = qwq.getElementsByTagName("button")
    for (let i = 0; i < tab!.length; i++) {
        var cn = tab!.item(i)!
        var title = (cn as HTMLElement).getAttribute("title")!
        if (obj[title] == "1") {
            xwx((cn as HTMLElement))
        }
    }

}
