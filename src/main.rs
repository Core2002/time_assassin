/**
 *  Copyright 2023 Core2002
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
use std::{collections::HashMap, io::Read};

use serde_json::Value;
use util::{commit_and_push, set_data};

use crate::util::sync_data;

mod util;

struct YearPanel {
    // year | count of start empty block | count of blocks in a year
    day_flag: [usize; 3],
    // 7 x 53 blocks for panel
    day_arr: [[usize; 7]; 53],
}

fn main() {
    util::init();

    let mut json_str = String::new();
    std::fs::File::open("json/test114514.json")
        .unwrap()
        .read_to_string(&mut json_str)
        .unwrap();

    let jmap: HashMap<String, Value> = serde_json::from_str(&json_str).unwrap();
    for (k, v) in jmap {
        set_data(&k);
        util::write_str(&k);
        commit_and_push("commit_message");
    }
    sync_data();
}

// 横着输出
fn print_year_panel_l(yp: YearPanel) {
    println!("--- {} ---", yp.day_flag[0]);
    for id in 0..yp.day_arr[0].len() {
        for iw in 0..yp.day_arr.len() {
            print!("{}", yp.day_arr[iw][id])
        }
        println!(" - {}", id + 1)
    }
}

// 初始化年看板
fn init_year_panel(yp: &mut YearPanel) {
    let lw = yp.day_arr[0].len();
    let ld = yp.day_arr.len();
    for iw in 0..ld {
        for id in 0..lw {
            if (iw + 1) * lw + (id + 1) - yp.day_flag[1] > yp.day_flag[2] {
                yp.day_arr[iw][id] = 1;
                continue;
            }
            if iw <= yp.day_flag[1] / lw && id + 1 <= yp.day_flag[1] % lw {
                yp.day_arr[iw][id] = 0;
            } else {
                yp.day_arr[iw][id] = 2;
            }
        }
    }
}

fn show_year_panel() {
    let mut y2018 = YearPanel {
        day_flag: [2018, 1, 365],
        day_arr: [[0; 7]; 53],
    };

    init_year_panel(&mut y2018);
    print_year_panel_l(y2018);

    let mut y2019 = YearPanel {
        day_flag: [2019, 2, 365],
        day_arr: [[0; 7]; 53],
    };

    init_year_panel(&mut y2019);
    print_year_panel_l(y2019);

    let mut y2020 = YearPanel {
        day_flag: [2020, 3, 366],
        day_arr: [[0; 7]; 53],
    };

    init_year_panel(&mut y2020);
    print_year_panel_l(y2020);
}
