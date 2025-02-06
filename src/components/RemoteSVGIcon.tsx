import React, { useState, useEffect } from 'react';

function RemoteSVGIcon(props: {
  iconSize?: number;
  iconColor?: string;
  url: string;
}) {
  const iconSize = props.iconSize || 50;
  const iconColor = props.iconColor || 'black';
  const [svgPath, setSvgPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSvgPath = async () => {
      try {
        const response = await fetch(props.url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        const path = data.svg; // Assuming the JSON has a "svg" key with path data
        setSvgPath(path);
        setLoading(false);
      } catch (e: any) {
        console.error(e);
        setError(e.message);
        setLoading(false);
      }
    };

    fetchSvgPath();
  }, [props.url]);

  if (loading) {
    return <div>...</div>;
  }

  if (error) {
    return (
      <svg width={iconSize} height={iconSize} fill={iconColor}>
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="black"
          strokeWidth="3"
          fill="red"
        />
      </svg>
    );
  }

  return (
    <svg width={iconSize} height={iconSize} viewBox="0 0 100 100" fill={iconColor}>
      <path d={svgPath!} />
    </svg>
  );
}

export default RemoteSVGIcon;
