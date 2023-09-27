import { CancelIcon, EditIcon } from "@/assets/icons";
import classNames from "classnames";
import { useState } from "react";
import { nanoid } from "nanoid";
import { QUESTION_TYPES } from "../constant";
import SelectInput from "@/components/SelectInput";
import TextInput from "@/components/TextInput";
import { PlusOutlined } from "@ant-design/icons";

const AdditionalQuestions = ({
  questions,
  handleSaveNewQuestion,
  handleDeleteQuestion,
}) => {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState<any>(null);

  const handleAddQuestion = () => {
    setNewQuestion({
      id: nanoid(),
      type: "",
      question: "",
      choices: [""],
      maxChoice: 0,
      disqualify: false,
      other: false,
    });
  };

  const handleChangeNewQuestion = (input, value) => {
    setNewQuestion((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const onSaveNewQuestion = () => {
    handleSaveNewQuestion(newQuestion);
    setNewQuestion(null);
  };

  const onDeleteQuestion = (id) => {
    handleDeleteQuestion(id);
    setActiveRow(null);
  };

  return (
    <div>
      {questions.map((item, idx) => (
        <div
          key={idx}
          className={classNames("py-4 border-b border-[#dfdfdf]", {
            "!border-b-0": idx === questions.length - 1,
          })}
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-sm text-[#979797]">{item.type}</span>
              <span className="font-bold text-base">{item.question}</span>
            </div>
            <EditIcon
              className="cursor-pointer"
              onClick={() => setActiveRow(activeRow === idx ? null : idx)}
            />
          </div>
          <div
            className={classNames("h-0 overflow-hidden transition-all", {
              "h-fit pt-4": activeRow === idx,
            })}
          >
            <div className="flex flex-col gap-3">
              <SelectInput
                label="Type"
                options={QUESTION_TYPES}
                value={item?.type}
              />
              <TextInput label="Question" placeholder="Type here" />
            </div>
            <div className="flex justify-between items-center mt-5">
              <button
                className="text-[#A80000] flex items-center gap-1 text-sm"
                onClick={() => onDeleteQuestion(item.id)}
              >
                <CancelIcon className="h-6 w-6" /> Delete question
              </button>
              <button
                className="bg-[#087B2F] text-white font-bold text-sm py-2 px-3 rounded"
                onClick={onSaveNewQuestion}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ))}

      {newQuestion ? (
        <div className="py-6 overflow-hidden transition-all ">
          <div className="flex flex-col gap-3">
            <SelectInput
              label="Type"
              options={QUESTION_TYPES}
              value={newQuestion?.type}
              onChange={(value) => handleChangeNewQuestion("type", value)}
            />
            <TextInput
              label="Question"
              placeholder="Type here"
              value={newQuestion?.question}
              onChange={(value) => handleChangeNewQuestion("question", value)}
            />
          </div>
          <div className="flex justify-between items-center mt-5">
            <button
              className="text-[#A80000] flex items-center gap-1 text-sm"
              onClick={() => setNewQuestion(null)}
            >
              <CancelIcon className="h-6 w-6" /> Delete question
            </button>
            <button
              className="bg-[#087B2F] text-white font-bold text-sm py-2 px-3 rounded"
              onClick={onSaveNewQuestion}
            >
              Save
            </button>
          </div>
        </div>
      ) : null}

      <div
        className="flex items-center gap-3 text-sm font-bold mt-4 cursor-pointer"
        onClick={handleAddQuestion}
      >
        <PlusOutlined className="text-xl" />
        <span>Add a question</span>
      </div>
    </div>
  );
};

export default AdditionalQuestions;
