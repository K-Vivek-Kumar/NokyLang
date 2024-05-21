#include <iostream>
#include "NokySupport.h"

int main()
{
    Calculator calc;

    int result = calc.add(5, 3);
    std::cout << "5 + 3 = " << result << std::endl;

    result = calc.subtract(10, 4);
    std::cout << "10 - 4 = " << result << std::endl;

    result = calc.multiply(7, 6);
    std::cout << "7 * 6 = " << result << std::endl;

    result = calc.divide(20, 4);
    std::cout << "20 / 4 = " << result << std::endl;

    return 0;
}
