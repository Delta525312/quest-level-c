import Image from "next/image";
import { memories, type MemoryAssetType } from "@/data/memories";

const memorySvgProps = {
  className: "memory-asset-svg",
  viewBox: "0 0 160 110",
  "aria-hidden": true,
} as const;

function MemoryAsset({ type }: { type: MemoryAssetType }) {
  if (type === "sea") return <svg {...memorySvgProps}><path fill="#8ed3e8" d="M0 52h160v58H0z"/><path fill="#fff4c7" d="M0 78h160v32H0z"/><path fill="#4ca6c7" d="M0 52h25v9h25v-9h29v9h27v-9h28v9h26v18H0z"/><path fill="#e9689e" d="M105 22h9v49h-9z"/><path fill="#fff9e8" d="m109 20 35 25h-35z"/><path fill="#ffbd68" d="M20 14h25v25H20z"/></svg>;
  if (type === "aquarium") return <svg {...memorySvgProps}><path fill="#173e60" d="M0 0h160v110H0z"/><path fill="#287ba1" d="M7 8h146v94H7z"/><path fill="#50b5cf" d="M7 8h146v18H7z"/><path fill="#fff9e8" d="M25 19h7v7h-7zm104 8h6v6h-6zM45 44h7v7h-7z"/><path fill="#511b3b" d="m28 65 20-15h49l23 13-14 8-9 13H48z"/><path fill="#9ec8d0" d="m35 64 17-11h41l20 11-15 7-8 8H52z"/><path fill="#fff9e8" d="M86 58h7v7h-7z"/><path fill="#e53f83" d="M91 57h5v5h-5z"/><path fill="#7ea94f" d="M13 74h9v28h-9zm13 10h8v18h-8zm109-15h10v33h-10zm-13 13h8v20h-8z"/><path fill="#f0b94d" d="M39 94h16v8H39zm56-4h18v12H95z"/></svg>;
  if (type === "dam") return <svg {...memorySvgProps}><path fill="#bfe1ee" d="M0 0h160v110H0z"/><path fill="#fff9e8" d="M13 15h39v12H13zm99 8h34v11h-34z"/><path fill="#6d9a70" d="m0 62 31-30 24 20 27-35 29 34 19-22 30 32v18H0z"/><path fill="#4ca6c7" d="M0 73h160v37H0z"/><path fill="#8ed3e8" d="M0 80h30v8h29v-8h31v8h28v-8h42v12H0z"/><path fill="#511b3b" d="m25 58 110-8v13L29 72z"/><path fill="#d8c7b7" d="m30 62 100-7v35L42 98z"/><path fill="#fff0c9" d="m40 66 82-6v8l-80 7z"/><path fill="#8e2859" d="M50 72h9v22h-9zm26-2h9v20h-9zm27-2h9v18h-9z"/><path fill="#f0b94d" d="M17 98h26v8H17zm101-2h30v8h-30z"/></svg>;
  if (type === "camera") return <svg {...memorySvgProps}><path fill="#fbd6e5" d="M0 0h160v110H0z"/><path fill="#fff0c9" d="M13 91h134v13H13z"/><path fill="#511b3b" d="M20 39h120v59H20zM48 27h41v15H48z"/><path fill="#e9689e" d="M27 46h106v45H27z"/><path fill="#ff91bb" d="M34 51h28v13H34z"/><path fill="#511b3b" d="M73 49h48v42H73z"/><path fill="#8ed3e8" d="M81 57h32v27H81z"/><path fill="#173e60" d="M88 63h18v15H88z"/><path fill="#fff9e8" d="M92 66h8v8h-8zM119 51h9v9h-9z"/><path fill="#f0b94d" d="M42 31h38v8H42z"/></svg>;
  if (type === "island") return <svg {...memorySvgProps}><path fill="#8ed3e8" d="M0 0h160v73H0z"/><path fill="#4ca6c7" d="M0 73h160v37H0z"/><path fill="#fff9e8" d="M12 18h43v13H12zm104 11h31v10h-31z"/><path fill="#fff0c9" d="M28 78h104v19H28z"/><path fill="#78ad78" d="M47 65h68v18H47z"/><path fill="#704839" d="M77 34h8v47h-8z"/><path fill="#5e945e" d="M50 25h30v17H50zm30-9h33v18H80zm5 22h32v16H85z"/><path fill="#e9689e" d="M18 91h22v8H18zm104 5h25v8h-25z"/><path fill="#fff4a8" d="M140 12h12v12h-12z"/></svg>;
  if (type === "dinner") return <svg {...memorySvgProps}><path fill="#ffe3ed" d="M0 0h160v110H0z"/><path fill="#fff0c9" d="M12 83h136v21H12z"/><path fill="#511b3b" d="M18 65h124v12H18zM31 75h9v32h-9zm89 0h9v32h-9z"/><path fill="#e9689e" d="M26 55h108v13H26z"/><path fill="#fff9e8" d="M33 44h35v18H33zm59 0h35v18H92z"/><path fill="#f0b94d" d="M41 49h19v8H41zm59 0h19v8h-19z"/><path fill="#78ad78" d="M70 45h20v17H70z"/><path fill="#511b3b" d="M76 26h8v21h-8z"/><path fill="#e53f83" d="M68 19h24v10H68z"/><path fill="#8e2859" d="M22 31h7v28h-7zm110 0h7v28h-7z"/></svg>;
  if (type === "shabu") return <svg {...memorySvgProps}><path fill="#fbd6e5" d="M0 0h160v110H0z"/><path fill="#fff0c9" d="M9 88h142v17H9z"/><path fill="#511b3b" d="M29 50h102v13H29zM39 61h82v34H39z"/><path fill="#d8c7b7" d="M35 54h90v9H35z"/><path fill="#e9689e" d="M45 66h70v22H45z"/><path fill="#f39a58" d="M52 69h20v10H52zm34 2h22v10H86z"/><path fill="#78ad78" d="M68 81h19v7H68z"/><path fill="#511b3b" d="M18 56h17v8H18zm107 0h17v8h-17z"/><path fill="#fff9e8" d="M56 22h8v24h-8zm20-12h8v36h-8zm21 9h8v27h-8z"/><path fill="#ff91bb" d="M59 18h8v8h-8zm20-12h8v8h-8zm21 9h8v8h-8z"/></svg>;
  if (type === "chill") return <svg {...memorySvgProps}><path fill="#bfe1ee" d="M0 0h160v110H0z"/><path fill="#fff9e8" d="M15 18h42v14H15zm97 10h35v12h-35z"/><path fill="#78ad78" d="M0 80h160v30H0z"/><path fill="#511b3b" d="M24 33h9v70h-9zm103 0h9v70h-9z"/><path fill="#5e945e" d="M8 18h42v29H8zm102-5h43v35h-43z"/><path fill="#e9689e" d="M34 58h92v10H34z"/><path fill="#fff0c9" d="M40 63h80v18H40z"/><path fill="#8e2859" d="M46 76h68v8H46z"/><path fill="#f0b94d" d="M17 87h20v8H17zm106 0h20v8h-20z"/></svg>;
  if (type === "star") return <svg {...memorySvgProps}><path fill="#35182f" d="M0 0h160v110H0z"/><path fill="#8e2859" d="M9 8h142v94H9z"/><path fill="#511b3b" d="M68 12h24v23h22v22h-14v14H88v26H72V71H60V57H46V35h22z"/><path fill="#f0b94d" d="M72 17h16v22h21v14H94v15H85v24H75V68H66V53H51V39h21z"/><path fill="#fff4a8" d="M76 25h8v29h-8zm-16 18h40v8H60z"/><path fill="#ff91bb" d="M22 20h8v8h-8zm104 7h10v10h-10zM27 76h7v7h-7zm107 3h8v8h-8z"/><path fill="#fff9e8" d="M42 12h5v5h-5zm75 57h6v6h-6zM45 93h6v6h-6z"/></svg>;
  if (type === "atv") return <svg {...memorySvgProps}><path fill="#bfe1ee" d="M0 0h160v110H0z"/><path fill="#9b745b" d="M0 78h160v32H0z"/><path fill="#704839" d="M8 91h28v8H8zm112-5h32v9h-32zM47 102h55v8H47z"/><path fill="#511b3b" d="M24 70h26v32H24zm85 0h27v32h-27z"/><path fill="#30202b" d="M30 76h14v20H30zm85 0h15v20h-15z"/><path fill="#e53f83" d="M40 49h77v38H40z"/><path fill="#ff91bb" d="M51 54h48v20H51z"/><path fill="#511b3b" d="M62 36h11v16H62zm36-8h8v28h-8zM96 27h24v7H96zM44 80h72v10H44z"/><path fill="#fff4a8" d="M47 62h14v10H47zm54 0h11v10h-11z"/><path fill="#8e6a55" d="M18 57h16v8H18zm110-9h22v9h-22z"/></svg>;
  if (type === "temple") return <svg {...memorySvgProps}><path fill="#fbd6e5" d="M0 0h160v110H0z"/><path fill="#78ad78" d="M0 91h160v19H0z"/><path fill="#fff0c9" d="M13 83h134v12H13z"/><path fill="#a96552" d="M27 68h106v18H27z"/><path fill="#d48765" d="M34 48h26v23H34zm66 0h26v23h-26zM67 34h28v40H67z"/><path fill="#8e2859" d="m47 15 13 33H34zm66 0 13 33h-26zM81 4l14 30H67z"/><path fill="#fff4a8" d="M77 44h8v30h-8zM43 57h8v14h-8zm66 0h8v14h-8z"/><path fill="#511b3b" d="M21 83h118v7H21z"/></svg>;
  if (type === "pagoda") return <svg {...memorySvgProps}><path fill="#fbd6e5" d="M0 0h160v110H0z"/><path fill="#78ad78" d="M0 91h160v19H0z"/><path fill="#511b3b" d="M18 94h124v8H18zM29 81h102v7H29zM41 68h78v7H41z"/><path fill="#fff9e8" d="M23 83h114v11H23zM34 71h92v10H34zM47 59h66v9H47z"/><path fill="#8e2859" d="M58 54h44v7H58zM65 40h30v6H65zM72 25h16v5H72z"/><path fill="#e7ad38" d="M64 45h32v14H64zM69 29h22v13H69zM75 14h10v15H75zM78 4h4v10h-4z"/><path fill="#fff1a3" d="M72 46h16v13H72zM75 30h10v11H75z"/><path fill="#ef6397" d="M10 80h8v11h-8zm132-7h8v18h-8z"/></svg>;
  if (type === "cave") return <svg {...memorySvgProps}><path fill="#bfe1ee" d="M0 0h160v110H0z"/><path fill="#78ad78" d="M0 84h160v26H0z"/><path fill="#7b5961" d="M13 27h134v83H13z"/><path fill="#9b7370" d="M22 18h30v18H22zm87 0h30v18h-30zM14 49h24v32H14zm108-1h25v34h-25z"/><path fill="#511b3b" d="M35 37h90v73H35z"/><path fill="#241527" d="M49 51h62v59H49z"/><path fill="#876169" d="M49 51h12v20H49zm50 0h12v24H99zM62 45h11v18H62zm26 0h11v15H88z"/><path fill="#fff0c9" d="m65 110 11-36h9l12 36z"/><path fill="#f0b94d" d="M76 70h10v12H76z"/><path fill="#fff7c9" d="M79 65h5v7h-5z"/></svg>;
  if (type === "market") return <svg {...memorySvgProps}><path fill="#a9ddef" d="M0 0h160v73H0z"/><path fill="#4ca6c7" d="M0 73h160v37H0z"/><path fill="#8e2859" d="M8 43h144v8H8z"/><path fill="#fff0c9" d="M16 50h34v28H16zm47 0h34v28H63zm47 0h34v28h-34z"/><path fill="#e53f83" d="M11 34h44v11H11zm47 0h44v11H58zm47 0h44v11h-44z"/><path fill="#f0b94d" d="M22 57h21v8H22zm47 0h21v8H69zm47 0h21v8h-21z"/><path fill="#704339" d="M35 82h88v9H35z"/><path fill="#fff9e8" d="M48 75h51v9H48z"/><path fill="#511b3b" d="M26 91h103v7H26z"/></svg>;
  if (type === "goldGift") return <svg {...memorySvgProps}><path fill="#fbd6e5" d="M0 0h160v110H0z"/><path fill="#fff0c9" d="M22 92h116v12H22z"/><path fill="#511b3b" d="M32 43h96v14H32zM39 56h82v48H39z"/><path fill="#e7ad38" d="M37 48h86v9H37zM44 61h72v38H44z"/><path fill="#fff1a3" d="M70 48h20v51H70z"/><path fill="#8e2859" d="M75 48h10v51H75z"/><path fill="#f0b94d" d="M42 18h25v12h12v18H61V36H42zM118 18H93v12H81v18h18V36h19z"/><path fill="#fff9e8" d="M49 22h14v8H49zm48 0h14v8H97z"/><path fill="#e53f83" d="M75 12h10v20H75z"/></svg>;
  if (type === "bag") return <svg {...memorySvgProps}><path fill="#ffdce9" d="M0 0h160v110H0z"/><path fill="#fff0c9" d="M15 91h130v14H15z"/><path fill="#511b3b" d="M35 39h90v65H35zM55 22h50v20H94V32H66v10H55z"/><path fill="#e9689e" d="M41 46h78v52H41z"/><path fill="#ff91bb" d="M49 53h24v37H49z"/><path fill="#8e2859" d="M76 46h8v52h-8z"/><path fill="#fff4a8" d="M73 65h15v14H73z"/><path fill="#e7ad38" d="M77 68h7v8h-7z"/><path fill="#fff9e8" d="M60 26h40v6H60z"/></svg>;
  if (type === "heart") return <svg {...memorySvgProps}><path fill="#ffe3ed" d="M0 0h160v110H0z"/><path fill="#f7bdd3" d="M15 88h130v15H15z"/><path fill="#511b3b" d="M42 25h28v13h20V25h28v13h14v29h-14v14h-14v14H90v11H70V95H56V81H42V67H28V38h14z"/><path fill="#e53f83" d="M44 32h24v13h24V32h24v13h12v20h-13v14h-14v13H88v10H72V92H59V79H45V65H32V45h12z"/><path fill="#ff91bb" d="M47 38h15v12H47z"/><path fill="#fff9e8" d="M58 48h10v10H58z"/></svg>;
  if (type === "bbq") return <svg {...memorySvgProps}><path fill="#ffdce9" d="M0 0h160v110H0z"/><path fill="#fff0c9" d="M8 88h144v22H8z"/><path fill="#511b3b" d="M25 65h110v15H25zM39 80h9v27h-9zm73 0h9v27h-9z"/><path fill="#8d6d68" d="M35 43h90v26H35z"/><path fill="#d9c2b2" d="M45 38h70v22H45z"/><path fill="#e53f83" d="M55 45h20v8H55zm31 2h21v8H86z"/><path fill="#f39a58" d="M67 22h10v15H67zm21-9h10v24H88z"/><path fill="#fff4a8" d="M70 27h7v10h-7zm21-9h7v19h-7z"/><path fill="#78ad78" d="M46 57h17v8H46zm51 0h18v8H97z"/></svg>;
  if (type === "nausea") return <svg {...memorySvgProps}><path fill="#f7dbea" d="M0 0h160v110H0z"/><path fill="#78ad78" d="M0 91h160v19H0z"/><path fill="#6d9a70" d="m0 78 31-35 22 22 28-42 31 38 18-20 30 37v17H0z"/><path fill="#fff0c9" d="m69 110 13-24-12-16 17-18-11-19 13-20 11 6-10 16 12 20-17 17 12 16-10 22z"/><path fill="#b9d978" d="M23 29h50v46H23z"/><path fill="#511b3b" d="M32 41h9v9h-9zm24 0h9v9h-9zM36 60h25v7H36z"/><path fill="#77a84b" d="M28 67h40v13H28z"/><path fill="#d9ffc8" d="M69 69h12v8h10v8h11v9H78v-8H66z"/></svg>;
  if (type === "sheep") return <svg {...memorySvgProps}><path fill="#bfe1ee" d="M0 0h160v110H0z"/><path fill="#78ad78" d="M0 75h160v35H0z"/><path fill="#fff9e8" d="M35 36h21V25h24v8h23v11h13v28h-14v12H53V76H34z"/><path fill="#d8c7b7" d="M102 45h27v29h-27z"/><path fill="#511b3b" d="M110 54h6v6h-6zm12 0h6v6h-6zM50 79h9v23h-9zm42 0h9v23h-9z"/><path fill="#fff0c9" d="M18 74h46v8H18z"/><path fill="#e53f83" d="M19 63h8v12h-8zm13 2h8v10h-8zm14-4h8v14h-8z"/></svg>;
  if (type === "cafe") return <svg {...memorySvgProps}><path fill="#fff3d1" d="M18 20h124v82H18z"/><path fill="#8e2859" d="M12 14h136v13H12zM12 96h136v12H12z"/><path fill="#e86d9d" d="M31 35h48v51H31z"/><path fill="#511b3b" d="M87 47h43v9H87v31H78V47z"/><path fill="#fff9e8" d="M94 61h25v17H94z"/><path fill="#ffbd68" d="M98 65h17v9H98z"/></svg>;
  if (type === "movie") return <svg {...memorySvgProps}><path fill="#511b3b" d="M18 30h124v72H18z"/><path fill="#fff0c9" d="M30 42h100v48H30z"/><path fill="#e53f83" d="m68 52 30 14-30 15z"/><path fill="#f865a0" d="M24 12h112v19H24z"/><path fill="#fff" d="M33 17h12v8H33zm25 0h12v8H58zm27 0h12v8H85zm28 0h12v8h-12z"/></svg>;
  if (type === "trip") return <svg {...memorySvgProps}><path fill="#78ad78" d="M0 77h160v33H0z"/><path fill="#8ed3e8" d="M0 0h160v78H0z"/><path fill="#fff" d="M13 22h48v15H13zm86 12h45v13H99z"/><path fill="#e9689e" d="M44 62h72v31H44z"/><path fill="#511b3b" d="M54 54h52v10H54zM52 90h17v13H52zm40 0h17v13H92z"/><path fill="#fff0c9" d="M57 69h18v12H57zm29 0h18v12H86z"/></svg>;
  if (type === "flowers") return <svg {...memorySvgProps}><path fill="#78ad78" d="M0 78h160v32H0z"/><path fill="#fff0c9" d="M72 47h16v56H72z"/><path fill="#e53f83" d="M65 20h30v30H65zM36 39h27v27H36zm61 0h27v27H97z"/><path fill="#fff9e8" d="M73 28h14v14H73zM43 46h13v13H43zm61 0h13v13h-13z"/><path fill="#5f9967" d="M50 62h11v33H50zm48 0h11v33H98z"/></svg>;
  return <svg {...memorySvgProps}><path fill="#78ad78" d="M0 83h160v27H0z"/><path fill="#fff0c9" d="M27 45h106v58H27z"/><path fill="#e9689e" d="m17 48 63-39 63 39z"/><path fill="#511b3b" d="M69 65h24v38H69z"/><path fill="#8ed3e8" d="M38 60h21v20H38zm64 0h21v20h-21z"/><path fill="#f865a0" d="M76 75h9v9h-9z"/></svg>;
}

const timelineSprinkleSvgProps = {
  className: "timeline-sprinkle-svg",
  viewBox: "0 0 120 96",
  "aria-hidden": true,
} as const;

const timelineSprinkleArt = [
    <svg {...timelineSprinkleSvgProps} key="hearts"><path fill="#511b3b" d="M21 25h17v9h13v-9h17v9h9v19h-9v10h-9v10H46V63H37V53h-9V34h-7z"/><path fill="#e53f83" d="M25 29h12v9h16v-9h11v9h8v13h-9v10h-8v8h-7v-8h-9V51h-8V38h-6z"/><path fill="#ff91bb" d="M81 55h10v7h7v-7h10v7h6v12h-6v7h-7v8h-7v-8h-7v-7h-6z"/><path fill="#fff9e8" d="M34 36h7v7h-7z"/></svg>,
    <svg {...timelineSprinkleSvgProps} key="camera"><path fill="#511b3b" d="M13 34h94v51H13zM35 23h31v14H35z"/><path fill="#e9689e" d="M19 40h82v39H19z"/><path fill="#ff91bb" d="M25 46h24v11H25z"/><path fill="#511b3b" d="M54 43h39v36H54z"/><path fill="#8ed3e8" d="M61 50h25v22H61z"/><path fill="#fff9e8" d="M66 54h8v8h-8zM91 45h7v7h-7z"/><path fill="#f0b94d" d="M40 27h22v8H40z"/></svg>,
    <svg {...timelineSprinkleSvgProps} key="flowers"><path fill="#5f9967" d="M30 47h7v39h-7zm26-8h7v47h-7zm28 13h7v34h-7z"/><path fill="#e53f83" d="M20 29h27v25H20zm26-10h27v25H46zm28 15h27v25H74z"/><path fill="#fff9e8" d="M28 37h11v10H28zm26-10h11v10H54zm28 15h11v10H82z"/><path fill="#78ad78" d="M24 76h76v10H24z"/></svg>,
    <svg {...timelineSprinkleSvgProps} key="stars"><path fill="#f0b94d" d="M49 9h14v20h19v14H68v15H58v21H47V58H36V43H22V29h19V9z"/><path fill="#fff4a8" d="M52 19h7v23H36v-7h16z"/><path fill="#e53f83" d="M88 48h9v12h12v9H98v12h-9V69H78v-9h10zM11 67h7v7h-7z"/><path fill="#fff9e8" d="M94 20h8v8h-8zM18 12h6v6h-6z"/></svg>,
    <svg {...timelineSprinkleSvgProps} key="boat"><path fill="#4ca6c7" d="M4 64h112v25H4z"/><path fill="#8ed3e8" d="M4 64h22v7h21v-7h23v7h22v-7h24v10H4z"/><path fill="#511b3b" d="M32 57h67l-12 19H45zM63 13h7v46h-7z"/><path fill="#fff9e8" d="m69 17 28 26H69z"/><path fill="#e9689e" d="m62 24-22 25h22z"/><path fill="#f0b94d" d="M7 13h15v15H7z"/></svg>,
    <svg {...timelineSprinkleSvgProps} key="coffee"><path fill="#511b3b" d="M24 42h65v43H24zM89 49h19v26H89v-8h10V57H89z"/><path fill="#fff9e8" d="M31 49h51v28H31z"/><path fill="#b57b57" d="M35 50h43v9H35z"/><path fill="#e9689e" d="M38 65h37v8H38z"/><path fill="#f0b94d" d="M18 82h83v8H18z"/><path fill="#fff9e8" d="M43 12h7v23h-7zm17-8h7v31h-7zm18 12h7v19h-7z"/></svg>,
    <svg {...timelineSprinkleSvgProps} key="gift"><path fill="#511b3b" d="M24 40h78v15H24zM31 54h64v37H31z"/><path fill="#e7ad38" d="M29 45h68v10H29zM36 60h54v25H36z"/><path fill="#e53f83" d="M58 45h11v40H58z"/><path fill="#fff4a8" d="M38 24h19v10h8v11H51V36H38zm50 0H70v10h-8v11h14V36h12z"/><path fill="#fff9e8" d="M42 27h11v7H42zm32 0h10v7H74z"/></svg>,
    <svg {...timelineSprinkleSvgProps} key="butterfly"><path fill="#511b3b" d="M54 26h12v50H54zM20 20h25v12h10v23H44v14H24V57H14V32h6zm80 0H75v12H65v23h11v14h20V57h10V32h-6z"/><path fill="#e9689e" d="M23 25h18v12h10v14H40v12H27V52h-8V36h4zm74 0H79v12H69v14h11v12h13V52h8V36h-4z"/><path fill="#fff4a8" d="M27 31h10v10H27zm56 0h10v10H83z"/><path fill="#8e2859" d="M57 18h6v12h-6z"/></svg>,
] as const;

function TimelineSprinkle({ variant }: { variant: number }) {
  const art = timelineSprinkleArt[variant % timelineSprinkleArt.length];

  return <span className={`timeline-sprinkle timeline-sprinkle--${variant % 4}`} aria-hidden="true">{art}<i /><i /></span>;
}

export default function MemoryTimeline() {
  return (
    <div className="scene timeline-scene">
      <p className="quest-badge">LV.03 • MEMORY PATH</p>
      <h1>แกลเลอรี่ความทรงจำ</h1>
      <p className="timeline-intro">เรื่องเล่าของเราที่ค่อย ๆ ต่อกันไปทีละความทรงจำ</p>
      <div className="mobile-story-bar" aria-hidden="true">
        <span>♥ STORY LOG</span>
        <strong>{memories.length} MEMORIES</strong>
      </div>

      <ol className="memory-timeline">
        {memories.map((memory, index) => (
          <li className={`memory-entry memory-entry--${index % 2 === 0 ? "left" : "right"} ${memory.image ? "memory-entry--photo" : ""}`} key={memory.id}>
            <span className="memory-node" aria-hidden="true">
              <b>MEMORY {String(index + 1).padStart(2, "0")}</b>
              <span>{memory.emoji ?? "♥"}</span>
            </span>
            <TimelineSprinkle variant={index} />
            <article className="memory-card">
              <div className={`memory-media ${memory.image ? "memory-media--photo" : ""}`}>
                {memory.image ? (
                  <Image src={memory.image.src} alt={memory.image.alt} fill sizes="(max-width: 840px) calc(100vw - 42px), 430px" />
                ) : memory.asset ? (
                  <MemoryAsset type={memory.asset} />
                ) : null}
                {memory.image && memory.asset ? <span className="memory-asset-badge"><MemoryAsset type={memory.asset} /></span> : null}
                <span className="memory-photo-number">MEMORY {String(index + 1).padStart(2, "0")}</span>
                {memory.emoji ? <span className="memory-emoji" aria-hidden="true">{memory.emoji}</span> : null}
              </div>
              {memory.text || memory.title ? (
                <div className="memory-copy">
                  <span className="memory-level">MEMORY {String(index + 1).padStart(2, "0")}</span>
                  <h2>{memory.text ?? memory.title}</h2>
                </div>
              ) : null}
            </article>
          </li>
        ))}
      </ol>

      <div className="timeline-ending"><span>♥</span><strong>TO BE CONTINUED...</strong><span>♥</span></div>
    </div>
  );
}
