const Only: React.FC<{ if: boolean; children: React.ReactNode }> = ({ if: condition, children }) => {
    return condition ? <>{children}</> : null;
  };

export default Only;
