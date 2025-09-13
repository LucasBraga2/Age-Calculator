import { useState, useRef, useEffect } from "react";
import { InputGroup } from "./components/InputGroup";
import { Result } from "./components/Result";
import { Divider } from "./components/Divider";
import "./index.css";

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month: number, year: number) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

export default function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });
  const [result, setResult] = useState({ years: "--", months: "--", days: "--" });

  // useRef para focar no campo DAY ao carregar
  const dayInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dayInputRef.current) {
      dayInputRef.current.focus();
    }
  }, []);

  // useEffect para limpar erros ao alterar campos
  useEffect(() => {
    setErrors({ day: "", month: "", year: "" });
  }, [day, month, year]);

  function validate() {
    let valid = true;
    const newErrors = { day: "", month: "", year: "" };
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    const currentYear = new Date().getFullYear();

    if (!day) {
      newErrors.day = "Esse campo é obrigatório";
      valid = false;
    }
    if (!month) {
      newErrors.month = "Esse campo é obrigatório";
      valid = false;
    }
    if (!year) {
      newErrors.year = "Esse campo é obrigatório";
      valid = false;
    }

    if (day && (dayNum < 1 || dayNum > 31)) {
      newErrors.day = "Deve ser um dia válido";
      valid = false;
    }
    if (month && (monthNum < 1 || monthNum > 12)) {
      newErrors.month = "Deve ser um mês válido";
      valid = false;
    }
    if (year && (yearNum < 1900 || yearNum > currentYear)) {
      newErrors.year = "Deve ser um ano válido";
      valid = false;
    }

    if (valid && day && month && year) {
      const daysInMonth = getDaysInMonth(monthNum, yearNum);
      if (dayNum > daysInMonth) {
        newErrors.day = "Deve ser uma data válida";
        valid = false;
      }
      const inputDate = new Date(yearNum, monthNum - 1, dayNum);
      const today = new Date();
      if (inputDate > today) {
        newErrors.year = "Deve ser uma data válida";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      setResult({ years: "--", months: "--", days: "--" });
      return;
    }

    const today = new Date();
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    let years = today.getFullYear() - yearNum;
    let months = today.getMonth() + 1 - monthNum;
    let days = today.getDate() - dayNum;

    if (days < 0) {
      months -= 1;
      const prevMonth = today.getMonth() === 0 ? 12 : today.getMonth();
      const prevYear = prevMonth === 12 ? today.getFullYear() - 1 : today.getFullYear();
      days += getDaysInMonth(prevMonth, prevYear);
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setResult({
      years: years.toString(),
      months: months.toString(),
      days: days.toString(),
    });
  }

  return (
    <main className="bg-white rounded-3xl sm:rounded-[60px] p-8 sm:p-12 max-w-xl mx-auto mt-16 shadow-lg">
      <form autoComplete="off" onSubmit={handleSubmit} id="age-form">
        <div className="flex gap-6 sm:gap-8">
          <InputGroup
            label="DAY"
            id="day"
            value={day}
            onChange={e => setDay(e.target.value)}
            error={errors.day}
            min={1}
            max={31}
            placeholder="DD"
            //inputRef={dayInputRef} // Passa a ref para o InputGroup
          />
          <InputGroup
            label="MONTH"
            id="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            error={errors.month}
            min={1}
            max={12}
            placeholder="MM"
          />
          <InputGroup
            label="YEAR"
            id="year"
            value={year}
            onChange={e => setYear(e.target.value)}
            error={errors.year}
            min={1900}
            max={9999}
            placeholder="YYYY"
          />
        </div>
        <Divider />
      </form>
      <Result years={result.years} months={result.months} days={result.days} />
    </main>
  );
}
