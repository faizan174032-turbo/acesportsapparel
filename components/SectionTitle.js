export default function SectionTitle({ title, sub, as: Tag = 'h2' }) {
  return (
    <div className="title" data-reveal="up">
      <Tag>{title}</Tag>
      {sub && <div className="sub">{sub}</div>}
    </div>
  );
}
