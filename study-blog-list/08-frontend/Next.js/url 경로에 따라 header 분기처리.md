```jsx

const HeaderBox = () => {
  const pathname = usePathname();
  const pageWithoutHeader = ["/login", "/signup", "/find-pwd" , "/find-id" , "/aboutus"];

  const isHidden = pageWithoutHeader.includes(pathname);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };
```