use crate::data_util::update_data;

mod data_util;

struct YearPanel {
    // year | count of start empty block | count of blocks in a year
    day_flag: [usize; 3],
    // 7 x 53 blocks for panel
    day_arr: [[usize; 7]; 53],
}

fn main() {
    let y2018 = YearPanel {
        day_flag: [2018, 1, 365],
        day_arr: [[0; 7]; 53],
    };

    print_year_panel(y2018);
}

fn print_year_panel(yp: YearPanel) {
    for iw in 0..yp.day_arr.len() {
        for id in 0..yp.day_arr[iw].len() {
            if iw * 7 + id > yp.day_flag[2] {
                break;
            }
            if iw <= yp.day_flag[1] / 7 && id < yp.day_flag[2] % 7 {
                print!("X")
            } else {
                print!("{}", id)
            }
        }
        println!(" - {}", iw + 1)
    }
}
