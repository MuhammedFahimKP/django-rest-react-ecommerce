from datetime import datetime

def generate_year_list_from_current_year():
    """
    Generate a list of years from the 2022 to the current year.
    
    Returns:
        list: A list of years.
    """
    current_year = datetime.now().year
    year_list = [ str(year)  for year in  list(range(2022, current_year + 1))]
    return year_list



