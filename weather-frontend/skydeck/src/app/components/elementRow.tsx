import { TrashIcon } from "@heroicons/react/24/solid";
import Dropdown from "@/app/components/dropdown";
import ReturnUnit from "@/app/components/return_unit";

type Element = {
  title: string;
  operator: string;
  value: number;
  unit?: string;
};

type ElementRowProps = {
  element: Element;
  index: number;
  weatherOptions: { weather: string; unit: string }[];
  operatorOptions: string[];
  updateElement: (
    i: number,
    key: "title" | "operator" | "value",
    newValue: string
  ) => void;
  handleDeleteElement: (indexToDelete: number) => void;
};

const ElementRow = ({
  element,
  index,
  weatherOptions,
  operatorOptions,
  updateElement,
  handleDeleteElement,
}: ElementRowProps) => {
  return (
    <div className="flex flex-row gap-4 items-center justify-items-center overflow-visible">
      {/* Weather dropdown */}

      <Dropdown
        label={element.title}
        options={weatherOptions.map((opt) => opt.weather)}
        onChange={(value: string) => updateElement(index, "title", value)}
        value={element.title}
      />

      {/* Operator, value, unit, delete */}

      <div className="w-[90px]">
        <Dropdown
          label="Operator"
          options={operatorOptions}
          value={element.operator}
          onChange={(value: string) => updateElement(index, "operator", value)}
        />
      </div>

      <input
        className="w-[90px] h-10 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-800"
        value={element.value}
        type="number"
        inputMode="decimal"
        onChange={(e) => updateElement(index, "value", e.target.value)}
      />
      <div className="flex items-center justify-between">
        <p className="w-[50px] text-center ">
          <ReturnUnit weather={element.title} />
        </p>
      </div>

      <button
        type="button"
        className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
        onClick={() => handleDeleteElement(index)}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ElementRow;
