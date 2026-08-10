/* global React, ReactDOM, Motion */
const { useState } = React,
  M = window.Motion?.motion || { div: "div" };
const I = ({ children }) => <span className="i">{children}</span>;
function Logo() {
  return (
    <div className="logo">
      <span className="mark">
        <i />
        <i />
        <i />
      </span>
      monity
    </div>
  );
}
function Button({ children, onClick, kind = "", type = "button" }) {
  return (
    <button type={type} className={"btn " + kind} onClick={onClick}>
      {children}
    </button>
  );
}
function Login({ enter }) {
  let [email, setEmail] = useState(""),
    [pass, setPass] = useState(""),
    [err, setErr] = useState("");
  function go(e) {
    e.preventDefault();
    if (!email || !pass)
      return setErr("Enter your email and password to continue.");
    enter();
  }
  return (
    <main className="login">
      <section className="story">
        <Logo />
        <div className="copy">
          <b>MONITOR WITH CONFIDENCE</b>
          <h1>Stay on top of what matters.</h1>
          <p>
            Bring every update, mention and important change into one
            beautifully simple workspace.
          </p>
        </div>
        <div className="benefits">
          {[
            [
              "01",
              "Everything in one place",
              "Watch all your sources from a single view.",
            ],
            [
              "02",
              "Never miss a signal",
              "Get timely alerts when something changes.",
            ],
            [
              "03",
              "Made for focused teams",
              "Keep everyone aligned and informed.",
            ],
          ].map((x) => (
            <div>
              <b>{x[0]}</b>
              <span>
                <strong>{x[1]}</strong>
                <small>{x[2]}</small>
              </span>
            </div>
          ))}
        </div>
        <small>“An elegant way to keep a pulse on our world.”</small>
      </section>
      <section className="signin">
        <div className="form">
          <div className="mobileLogo">
            <Logo />
          </div>
          <h2>Welcome back</h2>
          <p>Sign in to your Monity account</p>
          <form onSubmit={go}>
            <label>
              Email address
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                type="email"
              />
            </label>
            <label>
              Password<a>Forgot password?</a>
              <input
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                type="password"
              />
            </label>
            {err && <em>{err}</em>}
            <Button type="submit">
              Sign in <I>→</I>
            </Button>
          </form>
          <div className="or">──── or continue with ────</div>
          <div className="social">
            <Button kind="plain">G&nbsp; Google</Button>
            <Button kind="plain">●&nbsp; Apple</Button>
          </div>
          <small>
            New to Monity? <a>Create an account</a>
          </small>
        </div>
      </section>
    </main>
  );
}
const items = [
  ["Overview", "⌂"],
  ["Monitors", "⌁"],
  ["Calendar", "▣"],
  ["Sources", "◇"],
];
function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <aside className={"side " + (open ? "open" : "")}>
      <div>
        <Logo />
        <button className="x" onClick={() => setOpen(false)}>
          ×
        </button>
      </div>
      <nav>
        {items.map((x) => (
          <button
            className={active === x[0] ? "on" : ""}
            onClick={() => {
              setActive(x[0]);
              setOpen(false);
            }}
          >
            <I>{x[1]}</I>
            {x[0]}
          </button>
        ))}
      </nav>
      <footer>
        <button>
          <I>?</I>Help center
        </button>
        <button>
          <I>⚙</I>Settings
        </button>
        <div className="user">
          <b>AR</b>
          <span>
            <strong>Alex Rivera</strong>
            <small>alex@monity.co</small>
          </span>
          <I>⌄</I>
        </div>
      </footer>
    </aside>
  );
}
const ev = [
  ["1", "Website updates", "v"],
  ["2", "Product Hunt", "o"],
  ["4", "Social mentions", "b"],
  ["7", "New review", "p"],
  ["8", "Website updates", "v"],
  ["10", "Keyword check", "g"],
  ["12", "Social mentions", "b"],
  ["13", "Competitor alert", "o"],
  ["15", "Weekly report", "p"],
  ["17", "Website updates", "v"],
  ["19", "New review", "p"],
  ["20", "Keyword check", "g"],
  ["23", "Social mentions", "b"],
  ["25", "Competitor alert", "o"],
  ["28", "Weekly report", "p"],
];
function Calendar() {
  let d = Array.from({ length: 35 }, (_, i) => i - 2);
  return (
    <div className="cal">
      <div className="week">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((x) => (
          <span>{x}</span>
        ))}
      </div>
      <div className="dates">
        {d.map((n, i) => {
          let date = n < 1 ? 28 + n : n,
            list = ev.filter((e) => +e[0] === date);
          return (
            <div className={"day " + (n < 1 || n > 30 ? "dim" : "")}>
              <b className={date === 19 ? "today" : ""}>{date}</b>
              {list.map((e) => (
                <span className={"event " + e[2]}>{e[1]}</span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Dashboard({ source, monitor }) {
  let [active, setActive] = useState("Calendar"),
    [open, setOpen] = useState(false),
    [month, setMonth] = useState("August 2026"),
    [view, setView] = useState("Month");
  return (
    <div className="shell">
      <Sidebar {...{ active, setActive, open, setOpen }} />
      <main>
        <header>
          <button className="hamb" onClick={() => setOpen(true)}>
            ☰
          </button>
          <span>
            <b>{active}</b>
            <small>Keep track of every signal</small>
          </span>
          <div>
            <button className="icon">⌕</button>
            <button className="icon">♧</button>
            <Button kind="outline" onClick={source}>
              ＋ Add source
            </Button>
            <Button onClick={monitor}>＋ Add monitor</Button>
          </div>
        </header>
        <article>
          <div className="heading">
            <div>
              <b>YOUR MONITORS</b>
              <h1>Calendar</h1>
              <p>Plan and review your monitoring activity.</p>
            </div>
            <Button onClick={monitor}>＋</Button>
          </div>
          <div className="stats">
            {[
              ["⌁", "Active monitors", "12", "+2 this month", "v"],
              ["♧", "Updates this week", "48", "↑ 18% from last week", "o"],
              ["◇", "Connected sources", "8", "All sources healthy", "b"],
            ].map((x) => (
              <div>
                <I className={x[4]}>{x[0]}</I>
                <span>
                  <small>{x[1]}</small>
                  <strong>{x[2]}</strong>
                  <em>{x[3]}</em>
                </span>
              </div>
            ))}
          </div>
          <section className="calendar">
            <div className="toolbar">
              <div>
                <button onClick={() => setMonth("July 2026")}>‹</button>
                <strong>{month}</strong>
                <button onClick={() => setMonth("September 2026")}>›</button>
                <button onClick={() => setMonth("August 2026")}>Today</button>
              </div>
              <div className="views">
                {["Month", "Week", "List"].map((x) => (
                  <button
                    className={view === x ? "sel" : ""}
                    onClick={() => setView(x)}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <Calendar />
          </section>
        </article>
      </main>
    </div>
  );
}
function Modal({ children, close }) {
  return (
    <div
      className="overlay"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <M.div
        className="modal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button className="close" onClick={close}>
          ×
        </button>
        {children}
      </M.div>
    </div>
  );
}
function Sources({ close, next }) {
  let [s, setS] = useState("Website"),
    list = [
      ["◎", "Website", "Track any page for changes"],
      ["⌕", "Google Alerts", "Monitor web mentions and results"],
      ["◔", "RSS feed", "Follow news and blog updates"],
      ["◌", "Social media", "Keep an eye on conversations"],
    ];
  return (
    <Modal close={close}>
      <b className="eyebrow">STEP 1 OF 2</b>
      <h2>Add a source</h2>
      <p>Choose the type of source you want to connect.</p>
      <div className="sources">
        {list.map((x) => (
          <button
            className={s === x[1] ? "selected" : ""}
            onClick={() => setS(x[1])}
          >
            <I>{x[0]}</I>
            <span>
              <strong>{x[1]}</strong>
              <small>{x[2]}</small>
            </span>
            <b>○</b>
          </button>
        ))}
      </div>
      <Foot close={close} next={next} text="Continue →" />
    </Modal>
  );
}
function Foot({ close, next, text }) {
  return (
    <div className="foot">
      <Button kind="text" onClick={close}>
        Cancel
      </Button>
      <Button onClick={next}>{text}</Button>
    </div>
  );
}
function Monitor({ close }) {
  let [f, setF] = useState({ n: "", u: "", c: "v" });
  return (
    <Modal close={close}>
      <b className="eyebrow">NEW MONITOR</b>
      <h2>Create a monitor</h2>
      <p>Set up what you want Monity to watch for.</p>
      <form
        className="monitor"
        onSubmit={(e) => {
          e.preventDefault();
          close();
        }}
      >
        <label>
          Monitor name
          <input
            required
            value={f.n}
            onChange={(e) => setF({ ...f, n: e.target.value })}
            placeholder="e.g. Product launch mentions"
          />
        </label>
        <label>
          What should we monitor?
          <input
            required
            value={f.u}
            onChange={(e) => setF({ ...f, u: e.target.value })}
            placeholder="https://example.com or a keyword"
          />
        </label>
        <label>
          Check frequency
          <select>
            <option>Every hour</option>
            <option>Every 6 hours</option>
            <option>Once a day</option>
          </select>
        </label>
        <label>
          Label colour
          <div className="colors">
            {["v", "b", "p", "o", "g"].map((c) => (
              <button
                type="button"
                className={c + (f.c === c ? " pick" : "")}
                onClick={() => setF({ ...f, c })}
              />
            ))}
          </div>
        </label>
        <Foot close={close} text="Create monitor →" />
      </form>
    </Modal>
  );
}
function App() {
  let [inApp, setInApp] = useState(false),
    [modal, setModal] = useState();
  return (
    <>
      {inApp ? (
        <Dashboard source={() => setModal("s")} monitor={() => setModal("m")} />
      ) : (
        <Login enter={() => setInApp(true)} />
      )}{" "}
      {modal === "s" && (
        <Sources close={() => setModal()} next={() => setModal("m")} />
      )}{" "}
      {modal === "m" && <Monitor close={() => setModal()} />}
    </>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
