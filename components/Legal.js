export default function Legal({ doc }) {
  return (
    <article className="prose">
      <h1>{doc.title}</h1>
      {doc.updated && <p className="upd">{doc.updated}</p>}
      <p>{doc.intro}</p>
      {doc.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          {s.p && <p>{s.p}</p>}
          {s.ul && <ul>{s.ul.map((li) => <li key={li}>{li}</li>)}</ul>}
          {s.after && <p>{s.after}</p>}
        </section>
      ))}
    </article>
  );
}
