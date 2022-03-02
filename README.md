# node-jasperstarter

## English

A jasper report generator with jasperstarter.

It can compile a .jrxml to .jasper (unfinished), and generate a report by jasper file.

**Only support JSON be data source currently.**

jasper libs version: 6.17.0



### support fonts

- English: Serif, SansSerif
- Traditional Chinese (English also too): [open-huninn(jf open 粉圓體)](https://github.com/justfont/open-huninn-font)

### methods

#### generate({ jrxml, jasper, output, format, input, type }): Promise

- parameters

  - jrxml: Path of jrxml file which will use to compile if *jasper* didn't exist. 

  - jasper: Path of jasper file which wants to use to generate report.

  - output: The path (without filename extension) use to put the file which will be generated.

  - format: The format what you want to generate.

    1. pdf - *default*
    2. docx
    3. xlsx
    4. pptx
    5. odt
    6. ods

    *not support csv currently*

  - input: The path of JSON data source.

  - type: The type of data source, *only support JSON currently*.

- usage

  ```js
  const jasperstater = require("node-jasperstarter")
  
  jasperstarter.generate({
    jasper: "/home/project/data/example.jasper",
    output: "/home/project/data/temp/output",
    format: "pdf",
    input: "/home/project/data/example.json",
    type: "json"
  }).then((exportFile) => {
    // Something what you want to do.
    // exportFile will be a Buffer.
  }).catch((error) => {
    // It will return some error messages here if generated error.
  })
  ```
#### compile(jrxml) - *unfinished*
  

## 中文

這是一個使用 jasperstarter 來生產 jasper 報表的工具。

可以用來將 .jrxml 編譯成 .jasper(未完成)，並且可以透過 jasper 檔案來產生報表。

**目前僅支援 JSON 作為資料來源。**

jasper 函數庫版本: 6.17.0



### 支援字型

- 英文: Serif, SansSerif
- 繁體中文 (也支援英文): [open-huninn(jf open 粉圓體)](https://github.com/justfont/open-huninn-font)

### 方法

#### generate({ jrxml, jasper, output, format, input, type }): Promise

- 參數

  - jrxml: 當 *jasper* 檔案不存在時要用於編譯的 jrxml 檔案路徑。

  - jasper: 用於產生報表檔的 jasper 檔案路徑。

  - output: 產出的報表檔放置的檔案路徑(不須副檔名)。

  - format: 欲生成的檔案格式。

    1. pdf - *預設*
    2. docx
    3. xlsx
    4. pptx
    5. odt
    6. ods

    *尚不支援CSV*

  - input: 資料來源的JSON檔案路徑

  - type: 資料來源的形式，*目前僅支援JSON*。

- 用法
	```js
  const jasperstater = require("node-jasperstarter")
  
  jasperstarter.generate({
    jasper: "/home/project/data/example.jasper",
    output: "/home/project/data/temp/output",
    format: "pdf",
    input: "/home/project/data/example.json",
    type: "json"
  }).then((exportFile) => {
    // 報表產出後你要做的事情。
    // exportFile 會是個 Buffer。
  }).catch((error) => {
    // 如果有發生錯誤的話，會回傳錯誤訊息於此。
  })
  ```
#### compile(jrxml) - *尚未完成*
