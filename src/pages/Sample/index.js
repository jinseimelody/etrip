import './sample.scss';

const colors = [
  'seashell',
  'beige',
  'ghostwhite',
  'honeydew',
  'ivory',
  'lemonchiffon',
  'oldlace',
  'palegoldenrod',
  'lightyellow'
];
const randomBorder = () =>
  Math.min(70, Math.max(30, Math.floor(Math.random() * 100)));

const randomSize = () => Math.floor(Math.random() * 100);

const randomPosition = () => Math.floor(Math.random() * 400);

const Sample = () => {
  return (
    <div className="color-picker">
      {colors.map((x, i) => {
        const borderRadius = Array(8)
          .fill(0)
          .map((_, j) => {
            const slash = j === 3 ? ' /' : '';
            return randomBorder() + '%' + slash;
          })
          .join(' ');
        const size = randomSize() + '%';
        return (
          <div
            key={i}
            style={{
              background: x,
              borderRadius: borderRadius,
              width: size,
              paddingTop: size,
              top: randomPosition(),
              left: randomPosition()
            }}
            onClick={() => alert(x)}></div>
        );
      })}
    </div>
  );
};

export default Sample;
