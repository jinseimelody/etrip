const buslayout = {};
buslayout.limousine = {
  init: seats => {
    const getTemplate = arr => {
      let next = 0;
      const layout = [
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ].map(row =>
        row
          .map(x => {
            if (x === 0) return 0;
            const res = arr[next];
            next++;
            return res;
          })
          .filter(x => x !== 0)
      );
      return layout;
    };

    return {
      ground: getTemplate(seats.filter(s => s.seatId.startsWith('A'))),
      upstairs: getTemplate(seats.filter(s => s.seatId.startsWith('B')))
    };
  }
};

export default buslayout;
