const fs = require("fs");
const {Resvg} = require("@resvg/resvg-js")
const path_to_svg = __dirname + "/Main.svg";
const path_to_svg_clear = __dirname + "/Main_clear.svg";
const path_to_png_clear = __dirname + "/Main_clear.png";

let $;
const pathStringsArray = [];

function main() {
  fs.readFile(path_to_svg, "utf8", (err, data) => {
      const regex = /<text (.*)>UNREGISTERED<\/text>/gm;
      var result = data.replace(regex, "");

      const clear_shadow = /<g><rect fill="#C0C0C0"(.*?)\/><\/g>/gm;;
      result = result.replace(clear_shadow, "");

      fs.writeFile(path_to_svg_clear,result,(err) => { 
          if (err) 
            console.log(err); 
          else { 
            console.log("SVG File written successfully\n"); 
            convertPNG(result)
          } 
        }); 
  });
}

function convertPNG(svg) {
  const resvg = new Resvg(svg, {})
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  fs.writeFile(path_to_png_clear,pngBuffer,(err) => { 
    if (err) 
      console.log(err); 
    else { 
      console.log("PNG File written successfully\n"); 
     
    } 
  }); 
}

main()