import React from 'react';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import moment from 'moment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GifButton from './Components/GifButton';
import StickerButton from './Components/StickerButton';
import EmojiButton from './Components/EmojiButton';
import DiscordMessage from './Components/DiscordMessage';

type TFormatOption = 'Short Time' |
'Long Time' |
'Short Date' |
'Long Date' |
'Long Date & Time' |
'Short Date & Time' |
'Relative Time';

type IFormatUnixMap = 't' | 'T' | 'd' | 'D' | 'f' | 'F' | 'R';
interface IFormatOptions {
  value: TFormatOption
  unix: IFormatUnixMap,
  display: string
}

function App() {
  const [dateTime, setDateTime] = React.useState<moment.Moment | null>(
    moment(),
  );
  const formatOptions: IFormatOptions[] = [
    { value: 'Relative Time', unix: 'R', display: 'fromNow' },
    { value: 'Short Time', unix: 't', display: 'h:mm A' },
    { value: 'Long Time', unix: 'T', display: 'h:mm:ss A' },
    { value: 'Short Date', unix: 'd', display: 'M/DD/YYYY' },
    { value: 'Long Date', unix: 'D', display: 'MMMM D, YYYY' },
    { value: 'Short Date & Time', unix: 'f', display: 'MMMM D, YYYY h:mm A' },
    { value: 'Long Date & Time', unix: 'F', display: 'dddd, MMMM D, YYYY h:mm A' },
  ];

  const [format, setFormat] = React.useState<IFormatOptions>(formatOptions[0]);

  const handleDTChange = (newValue: moment.Moment | null) => {
    setDateTime(newValue);
  };

  const handleFormatChange = (event: SelectChangeEvent) => {
    const newValue = formatOptions.find((o) => o.value === event.target.value);
    if (newValue) setFormat(newValue);
  };

  return (
    <div className="grid h-screen place-items-center bg-[#23272A]">
      <Paper elevation={3} className="w-fit p-8">
        <div className="mb-5">
          <Typography variant="h5" component="h1">Discord Date Time Utility</Typography>
          <Typography>Generate intractable dates and times for discord messages</Typography>
        </div>
        <div className="flex">
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              className=""
              label="Date & Time"
              value={dateTime}
              onChange={handleDTChange}
              renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
                <TextField {...params} />
              )}
            />
          </LocalizationProvider>
          <FormControl>
            <InputLabel id="demo-simple-select-label" className="ml-3">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={format.value}
              label="Age"
              onChange={handleFormatChange}
              className="ml-3 w-fit"
            >
              {formatOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <DiscordMessage
            userName="J_C___"
            avatarUrl="https://cdn.discordapp.com/avatars/204792579881959424/a_fa134dd53184ee96d2ed127b9ba31edc.gif"
            format={format.display}
            dateTime={dateTime}
          />
        </div>
        <div className="flex mt-5">
          <TextField
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" className="pl-3.5">
                  <AddCircleIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" className="pr-3.5">
                  <GifButton />
                  <StickerButton />
                  <EmojiButton />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            fullWidth
            value={`<t:${dateTime ? dateTime.unix() : null}:${format.unix}>`}
            className="bg-[#eaedef] !rounded-lg"
          />
        </div>

      </Paper>
    </div>
  );
}

export default App;
