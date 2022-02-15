(function (win) {
  let global = win;
  let doc = this.document;

  let dom = function (params, context) {
    return new GetOrMakeDom(params, context);
  };
  let regXcontainsTag = /^\s*<(\w+|!)[^>]*>/;
  let GetOrMakeDom = function (params, context) {
    let currentContext = doc;
    if (context) {
      if (context.nodeType) {
        currentContext = context;
      } else {
        currentContext = doc.querySelector(context);
      }
    }
    if (
      !params ||
      params === "" ||
      (typeof params === "string" && params.trim() === "")
    ) {
      this.length = 0;
      return this;
    }
    if (typeof params === "string" && regXcontainsTag.test(params)) {
      let divElm = currentContext.createElement("div");
      divElm.className = "hippo-doc-frag-wrapper";
      let docFrag = currentContext.createDocumentFragment();
      docFrag.appendChild(divElm);
      let queryDiv = docFrag.querySelector("div");
      queryDiv.innerHtml = params;
      let numberOfChildren = queryDiv.children.length;
      for (var z = 0; z < numberOfChildren; z++) {
        this[z] = queryDiv.children[z];
        console.log(this);
      }
      this.length = numberOfChildren;
      return this;
    }
    if (typeof params === "object" && params.nodeName) {
      this.length = 1;
      this[0] = params;
      return this;
    }
    let nodes;
    if (typeof params != "string") {
      nodes = params;
    } else {
      nodes = currentContext.querySelectorAll(params.trim());
    }
    let nodeLength = nodes.length;
    for (var i = 0; i < nodeLength; i++) {
      this[i] = nodes[i];
    }
    this.length = nodeLength;
    return this;
  };

  global.dom = dom;
  dom.fn = GetOrMakeDom.prototype;
  dom.fn.each = function (callback) {
    let len = this.length;
    for (let i = 0; i < len; i++) {
      callback.call(this[i], i, this[i]);
    }
    return this;
  };
  dom.fn.html = function (htmlString) {
    if (htmlString) {
      return this.each(function () {
        this.innerHtml = htmlString;
      });
    } else {
      return this[0].innerHtml;
    }
  };
  dom.fn.text = function (textString) {
    if (textString) {
      return this.each(function () {
        this.textContent = textString;
      });
    } else {
      return this[0].textContent.trim();
    }
  };
  dom.fn.append = function (stringOrObject) {
    return this.each(function () {
      if (typeof stringOrObject === "string") {
        this.insertAdjacentHTML("beforeend", stringOrObject);
      } else {
        let that = this;
        dom(stringOrObject).each(function (name, value) {
          that.insertAdjacentHTML("beforeend", value.outerHTML);
        });
      }
    });
  };
})(window);
