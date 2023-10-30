const DEFAULT_PER_PAGE = 10;

const renderFn = input.render ?? ((page) => dv.list(page.file.link));

const state = {
  data: input.data,
  perPage: input.perPage ?? DEFAULT_PER_PAGE,
  currentPage: 0,
};

function render(shouldFocus = false) {
  clear();
  const pageStart = state.currentPage * state.perPage;
  const pageEnd = pageStart + state.perPage;
  const page = state.data.slice(pageStart, pageEnd);
  renderFn(page);
  renderPagination();
  if (shouldFocus) {
    dv.container.querySelector("input[type=number]").focus();
  }
}

function renderPagination() {
  const maxPage = Math.ceil(state.data.length / state.perPage);
  dv.el("button", "←", {
    onclick: () => {
      state.currentPage -= 1;
      render();
    },
    attr: {
      ...(state.currentPage === 0 ? { disabled: "disabled" } : {}),
      style: "margin: 0 var(--size-4-2)",
    },
  });
  dv.el("input", null, {
    onchange: (ev) => {
      const newPage = Math.max(1, Math.min(maxPage, ev.target.valueAsNumber));
      state.currentPage = newPage - 1;
      render(true);
    },
    attr: {
      value: state.currentPage + 1,
      type: "number",
      min: 1,
      max: maxPage,
      style: "width: 3em; text-align: right;margin-right: var(--size-4-2)",
    },
  });
  dv.el("span", `/ ${maxPage}`);
  dv.el("button", "→", {
    onclick: () => {
      state.currentPage += 1;
      render();
    },
    attr: {
      ...(state.currentPage + 1 === maxPage ? { disabled: "disabled" } : {}),
      style: "margin: 0 var(--size-4-2)",
    },
  });
}

function clear() {
  while (dv.container.firstChild) {
    dv.container.removeChild(dv.container.firstChild);
  }
}

render();
