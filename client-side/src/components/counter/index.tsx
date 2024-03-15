type Props = {
  decreaseCount: () => void;
  increaseCount: () => void;
  count: number;
  decreaseCountButtonDisabled?: boolean;
  increaseCountButtonDisabled?: boolean;
};

const Counter = (props: Props) => {
  return (
    <div className="py-4 px-5 flex items-center gap-8 rounded-lg border-[0.5px] border-grey">
      <button
        type="button"
        onClick={props.decreaseCount}
        disabled={props.decreaseCountButtonDisabled}
        className="font-bold"
      >
        -
      </button>

      <span>{props.count} </span>

      <button
        type="button"
        onClick={props.increaseCount}
        disabled={props.increaseCountButtonDisabled}
        className="font-bold"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
