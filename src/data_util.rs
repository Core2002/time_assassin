use powershell_script::PsScriptBuilder;

pub fn up_date_data() {
    run_ps(r#"w32tm /resync"#);
}

pub fn set_data() {
    run_ps(r#"Set-Date "2018-04-17 09:27:20+08:00""#);
}

fn run_ps(cmd: &str) {
    let ps = PsScriptBuilder::new()
        .no_profile(true)
        .non_interactive(true)
        .hidden(false)
        .print_commands(false)
        .build();
    let output = ps.run(cmd).unwrap();
    print!("out: {}", output.stdout().unwrap());
}
