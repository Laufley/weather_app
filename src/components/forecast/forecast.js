import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";
import './forecast.css'


const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {

    const dayInWeek = new Date().getDay(); // to get the day of the week we are in as an integer where Sunday is 0, Monday is 1, etc
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length) // extracting the days of the week from the day we are in into a new array without modifying it
        .concat(WEEK_DAYS.slice(0, dayInWeek) // extracts the days of the week from the beginning of the week up to the current day.
        );
    //forecastDays now contains the days of the week in the correct order for a weather forecast. 
    //For example, if today is Wednesday, it would look like this: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday'].

    return (
        <>
            <label className="title"> Daily </label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`}></img>
                                    <label className="day">{forecastDays[idx]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-items-grid-item">
                                    <label>Pressure</label>
                                    <label>{item.main.pressure}hPa</label>
                                </div>
                                <div className="daily-items-grid-item">
                                    <label>Humidity</label>
                                    <label>{item.main.humidity}%</label>
                                </div>
                                <div className="daily-items-grid-item">
                                    <label>Clouds</label>
                                    <label>{item.clouds.all}%</label>
                                </div>
                                <div className="daily-items-grid-item">
                                    <label>Wind speed</label>
                                    <label>{item.wind.speed}m/s</label>
                                </div>
                                <div className="daily-items-grid-item">
                                    <label>Sea level</label>
                                    <label>{item.main.sea_level}m</label>
                                </div>
                                <div className="daily-items-grid-item">
                                    <label>Feels like</label>
                                    <label>{Math.round(item.main.feels_like)}°C </label>
                                </div>

                            </div>

                        </AccordionItemPanel>
                    </AccordionItem>

                ))}


            </Accordion>
        </>
    )
}

export default Forecast;

//allowZeroExpanded: Allows all the accordion to be closed
// AccordionItem: the parent of the itemHeading and itemPanel (Mandatory to have)
//      <AccordionItemHeading> : when it's not expanded we see the headings
//          <AccordionItemButton></AccordionItemButton> : Mandatory to have it within the Heading
//      <AccordionItemPanel: when the user clicks on it, it expands and they can see the details