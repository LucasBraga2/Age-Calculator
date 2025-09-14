import { useState, useRef, useEffect } from "react";
import { InputGroup } from "./InputGroup";
import { Result } from "./Result";
import { Divider } from "./Divider";

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDaysInMonth(month: number, year: number) {
  return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

interface DateFormProps {
  mode: 'age' | 'countdown';
}

export function DateForm({ mode }: DateFormProps) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });
  const [result, setResult] = useState({ years: "--", months: "--", days: "--" });

  const dayInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dayInputRef.current) {
      dayInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrors({ day: "", month: "", year: "" });
  }, [day, month, year]);

  function validate() {
    let valid = true;
    const newErrors = { day: "", month: "", year: "" };
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    
    // Validações genéricas
    if (!day) newErrors.day = "Esse campo é obrigatório", valid = false;
    if (!month) newErrors.month = "Esse campo é obrigatório", valid = false;
    if (!year) newErrors.year = "Esse campo é obrigatório", valid = false;
    if (day && (dayNum < 1 || dayNum > 31)) newErrors.day = "Deve ser um dia válido", valid = false;
    if (month && (monthNum < 1 || monthNum > 12)) newErrors.month = "Deve ser um mês válido", valid = false;
    if (year && yearNum < 1900) newErrors.year = "Deve ser um ano válido", valid = false;
    
    if (valid && day && month && year) {
      const daysInMonth = getDaysInMonth(monthNum, yearNum);
      if (dayNum > daysInMonth) newErrors.day = "Deve ser uma data válida", valid = false;
      
      const inputDate = new Date(yearNum, monthNum - 1, dayNum);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Zera o tempo para comparar apenas a data

      if (mode === 'age' && inputDate > today) {
        newErrors.year = "A data deve ser no passado";
        valid = false;
      }
      if (mode === 'countdown' && inputDate < today) {
        newErrors.year = "A data deve ser no futuro";
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

    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (mode === 'age') {
      const today = new Date();
      let years = today.getFullYear() - yearNum;
      let months = today.getMonth() + 1 - monthNum;
      let days = today.getDate() - dayNum;

      if (days < 0) {
        months -= 1;
        days += getDaysInMonth(today.getMonth() === 0 ? 12 : today.getMonth(), today.getFullYear());
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      setResult({ years: years.toString(), months: months.toString(), days: days.toString() });

    } else { // mode === 'countdown'
      const today = new Date();
      const futureDate = new Date(yearNum, monthNum - 1, dayNum);

      let years = futureDate.getFullYear() - today.getFullYear();
      let months = futureDate.getMonth() - today.getMonth();
      let days = futureDate.getDate() - today.getDate();

      if (days < 0) {
        months -= 1;
        days += getDaysInMonth(today.getMonth() + 1, today.getFullYear());
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      setResult({ years: years.toString(), months: months.toString(), days: days.toString() });
    }
  }

  return (
    <main>
      <form autoComplete="off" onSubmit={handleSubmit} id="age-form">
        <div className="flex gap-6 sm:gap-8">
          <InputGroup label="DAY" id="day" value={day} onChange={e => setDay(e.target.value)} error={errors.day} placeholder="DD" inputRef={dayInputRef} />
          <InputGroup label="MONTH" id="month" value={month} onChange={e => setMonth(e.target.value)} error={errors.month} placeholder="MM" />
          <InputGroup label="YEAR" id="year" value={year} onChange={e => setYear(e.target.value)} error={errors.year} placeholder="YYYY" />
        </div>
        <Divider />
      </form>
      <Result years={result.years} months={result.months} days={result.days} />
    </main>
  );
}