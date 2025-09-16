import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";
import React from "react";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.React = React;