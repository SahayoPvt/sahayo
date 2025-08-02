#include <bits/stdc++.h>
using namespace std;

void printSubarray(vector<vector<int>> &nums)
{

    for (auto v : nums)
    {

        for (auto i : v)
        {
            cout << i << " ";
        }
        cout << endl;
    }
}
int main()
{
    vector<int> nums = {1, 2, 3};
    // [1,3,6,2,5,3]


    vector<vector<int>> vec;
    vector<int> v;
    for (int i = 0; i < nums.size(); i++)
    {
        int sum = 0;
        for (int j = i; j < nums.size(); j++)
        {
            sum += nums[j];
            v.push_back(sum);
        }
    }
    for (auto i : v)
    {
        cout << i << " ";
    }

    // printSubarray(vec);
}