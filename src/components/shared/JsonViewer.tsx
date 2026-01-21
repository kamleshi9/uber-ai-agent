interface JsonViewerProps {
  title: string;
  data: any;
}

export default function JsonViewer({ title, data }: JsonViewerProps) {
  return (
    <div className="json-viewer">
      <h3 className="json-viewer-title">{title}</h3>
      <pre className="json-content">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
