use crate::data_util::up_date_data;

mod data_util;

struct YearPanel {
    // year | count of start empty block | count of blocks in a year
    day_flag: [usize; 3],
    // 7 x 53 blocks for panel
    day_arr: [[usize; 7]; 53],
}

fn main() {
    println!("2018");
    let mut y2018 = YearPanel {
        day_flag: [2018, 1, 365],
        day_arr: [[0; 7]; 53],
    };

    init_year_panel(&mut y2018);
    print_year_panel_l(y2018);

    println!("2019");
    let mut y2019 = YearPanel {
        day_flag: [2019, 2, 365],
        day_arr: [[0; 7]; 53],
    };

    init_year_panel(&mut y2019);
    print_year_panel_l(y2019);
}

// 横着输出
fn print_year_panel_l(yp: YearPanel) {
    for id in 0..yp.day_arr[0].len() {
        for iw in 0..yp.day_arr.len() {
            print!("{}", yp.day_arr[iw][id])
        }
        println!(" - {}", id + 1)
    }
}

// 初始化年看板
fn init_year_panel(yp: &mut YearPanel) {
    for iw in 0..yp.day_arr.len() {
        for id in 0..yp.day_arr[iw].len() {
            if (iw + 1) * 7 + (id + 1) - yp.day_flag[1] > yp.day_flag[2] {
                yp.day_arr[iw][id] = 2;
                continue;
            }
            if iw <= yp.day_flag[1] / 7 && id + 1 <= yp.day_flag[1] % 7 {
                yp.day_arr[iw][id] = 1;
            } else {
                yp.day_arr[iw][id] = 3;
            }
        }
    }
}
