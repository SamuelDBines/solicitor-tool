import React from "react";
import { useNavigate } from "react-router-dom";

interface ButtonProps {
  title: string;
  type?: 'link' | 'submit' | 'button';
  to?: string;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'warn';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, type = 'button', to, variant = 'primary' }) => {
  const navigate = useNavigate();

  const styles = React.useMemo(() => {
    if (variant === 'warn')
      return "bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-md text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-200";
    if (variant === 'secondary') {
      return "bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-md text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-200";
    }
    return "bg-gradient-to-r from-purple-500 to-purple-700 text-white px-8 py-4 rounded-md text-lg font-semibold shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-200";
  }, [variant]);
  const handleNavigate = () => {
    if (to)
      navigate(to);
  };

  if (type === 'link') {
    return <a
      onClick={handleNavigate}
      className={styles}
    >
      {title}
    </a>;
  }
  return <button className={styles}>{title}</button>;
};

export default Button;