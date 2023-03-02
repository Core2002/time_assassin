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
use powershell_script::PsScriptBuilder;
use std::{
    fs::{File, OpenOptions},
    io::Write,
};

pub fn init() {
    File::create("cmd.ps1").expect("create error");
}

pub fn sync_data() {
    write_command(r#"w32tm /resync"#);
}

pub fn set_data(data: &str) {
    write_command(&format!("Set-Date \"{} 09:27:20+08:00\"", data));
}

pub fn write_str(str: &str) {
    write_command(&format!("echo \"{}\" >> qwq.txt", str));
}

fn write_command(cmd: &str) {
    let mut file = OpenOptions::new()
        .append(true)
        .open("cmd.ps1")
        .expect("cannot open file cmd.ps1");
    file.write_all(format!("{}\n", cmd).as_bytes())
        .expect("write cmd.ps1 failed");
}

fn run_powershell(cmd: &str) {
    let ps = PsScriptBuilder::new()
        .no_profile(true)
        .non_interactive(true)
        .hidden(false)
        .print_commands(false)
        .build();
    let output = ps.run(cmd).unwrap();
    print!("{}", output.stdout().expect("run_powershell no stdout"));
}

pub fn commit_and_push(commit_message: &str) {
    write_command("git add .");
    write_command(&format!("git commit -m {}", commit_message));
    write_command("git push");
}
