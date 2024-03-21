"use client";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const [stdout, setStdout] = useState("");
  const [processing, setProcessing] = useState(false);
  const [verdict, setVerdict] = useState("Time Limit Exceded");
  const router = useRouter();
  const langOptions = [
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  const saveToLocalStorage = () => {
    console.log(code);
    localStorage.setItem(
      "savedData",
      JSON.stringify({ username, language, code, stdin })
    );
    localStorage.setItem("stdin", stdin);
  };

  const goToSubmissions = () => {
    saveToLocalStorage();
    router.push("/submissions");
  };

  const handleCodeRun = (e) => {
    saveToLocalStorage();
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (processing) {
      return;
    }
    setProcessing(true);
    if (code.trim() === "" || username.trim() === "") {
      alert("Enter required data");
      setProcessing(false);
      return;
    }
    const data = {
      username,
      code,
      language,
      stdin,
    };
    saveToLocalStorage();
    setTimeout(() => {
      console.log(data);
      setProcessing(false);
    }, 5000);
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("savedData"));
    if (savedData) {
      setUsername(savedData.username);
      setCode(savedData.code);
      setLanguage(savedData.language);
      setStdin(savedData.stdin);
    }
  }, []);

  return (
    <main className="container relative mx-auto flex min-h-screen flex-col items-center justify-between py-6">
      <div className="code-wrapper w-full max-w-[60rem] px-4">
        <div className="flex flex-col gap-4">
          <div className="editor-header flex justify-between flex-wrap gap-2">
            <input
              required
              type="text"
              name="username"
              id=""
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              className="outline-none border-b px-2 py-4 rounded-md backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30"
            />
            <select
              name="language"
              id=""
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none outline-none cursor-pointer text-zinc-100/60 px-2 border-b py-4 rounded-md backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30"
            >
              {langOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  label={option.label}
                ></option>
              ))}
            </select>
          </div>
          <Editor
            height="60vh"
            theme="vs-dark"
            defaultLanguage="cpp"
            defaultValue={code}
            onChange={(val, e) => setCode(val)}
            language={language}
          />
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div
              className={`verdict ${
                verdict === "Success" ? " text-green-400 " : " text-red-500 "
              } `}
            >
              {verdict}
            </div>
            <div
              className="buttons flex gap-2 items-center cursor-pointer"
              title="Recent Submissions"
            >
              <span className="" onClick={goToSubmissions}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  style={{ fill: "rgba(214, 213, 213, 0.8)" }}
                >
                  <path d="M12 8v5h5v-2h-3V8z"></path>
                  <path d="M21.292 8.497a8.957 8.957 0 0 0-1.928-2.862 9.004 9.004 0 0 0-4.55-2.452 9.09 9.09 0 0 0-3.626 0 8.965 8.965 0 0 0-4.552 2.453 9.048 9.048 0 0 0-1.928 2.86A8.963 8.963 0 0 0 4 12l.001.025H2L5 16l3-3.975H6.001L6 12a6.957 6.957 0 0 1 1.195-3.913 7.066 7.066 0 0 1 1.891-1.892 7.034 7.034 0 0 1 2.503-1.054 7.003 7.003 0 0 1 8.269 5.445 7.117 7.117 0 0 1 0 2.824 6.936 6.936 0 0 1-1.054 2.503c-.25.371-.537.72-.854 1.036a7.058 7.058 0 0 1-2.225 1.501 6.98 6.98 0 0 1-1.313.408 7.117 7.117 0 0 1-2.823 0 6.957 6.957 0 0 1-2.501-1.053 7.066 7.066 0 0 1-1.037-.855l-1.414 1.414A8.985 8.985 0 0 0 13 21a9.05 9.05 0 0 0 3.503-.707 9.009 9.009 0 0 0 3.959-3.26A8.968 8.968 0 0 0 22 12a8.928 8.928 0 0 0-.708-3.503z"></path>
                </svg>
              </span>
              <span
                disabled={processing}
                onClick={handleCodeRun}
                className={` ${
                  processing ? " opacity-50 cursor-not-allowed" : ""
                } flex items-center justify-between appearance-none cursor-pointer w-30 bg-zinc-800/30 border-2 border-neutral-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-zinc-100/80 hover:text-white hover:bg-zinc-800`}
              >
                Run
              </span>
              <span
                onClick={handleCodeSubmit}
                disabled={processing}
                className={` ${
                  processing ? " opacity-50 cursor-not-allowed " : ""
                } flex items-center appearance-none cursor-pointer w-30 bg-zinc-800/30 border-2 border-neutral-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-green-400 hover:text-white hover:bg-green-600`}
              >
                Submit
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <textarea
              placeholder="Input"
              name="stdin"
              id=""
              rows={6}
              onChange={(e) => setStdin(e.target.value)}
              value={stdin}
              className="outline-none flex-1 px-2 border-b py-1 rounded-md backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30"
            ></textarea>
            <textarea
              placeholder="Output"
              name="stdout"
              id=""
              rows={6}
              onChange={(e) => setStdout(e.target.value)}
              value={stdout}
              className="outline-none flex-1 px-2 border-b py-1 rounded-md backdrop-blur-2xl border-neutral-800 bg-zinc-800/30 from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:bg-zinc-800/30"
            ></textarea>
          </div>
        </div>
      </div>
    </main>
  );
}
