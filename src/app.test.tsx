import React from "react";
import { render, screen } from "@testing-library/react";

// Components
import App from "@/App";

describe("src/App.tsx", () => {
  describe("не передали свойств", () => {
    it("-> snapshot", () => {
      const { container } = render(<App />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it('-> отобразится заголовок "React App with custom webpack config"', () => {
      render(<App />);
      const title = screen.getByText(/React App with custom webpack config/i);
      expect(title).toBeInTheDocument();
    });
  });
});
