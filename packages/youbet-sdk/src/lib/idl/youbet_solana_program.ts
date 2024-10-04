export type YoubetSolanaProgram = {
  address: "7d9dheT1PcwmeE3PYYf4xjjnUJzhBpDMvAuUEBEdrE3W";
  metadata: {
    name: "youbetSolanaProgram";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "confirmTask";
      discriminator: [168, 184, 67, 118, 227, 95, 112, 166];
      accounts: [
        {
          name: "feeAndRentPayer";
          writable: true;
          signer: true;
        },
        {
          name: "task";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [84, 65, 83, 75];
              },
              {
                kind: "arg";
                path: "taskId";
              }
            ];
          };
        },
        {
          name: "project";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [80, 82, 79, 74, 69, 67, 84];
              },
              {
                kind: "account";
                path: "task.project_id";
                account: "taskAccount";
              }
            ];
          };
        },
        {
          name: "githubAccount";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [71, 73, 84, 72, 85, 66];
              },
              {
                kind: "arg";
                path: "github";
              }
            ];
          };
        },
        {
          name: "walletAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [87, 65, 76, 76, 69, 84];
              },
              {
                kind: "account";
                path: "github_account.wallet";
                account: "githubAccount";
              }
            ];
          };
        },
        {
          name: "projectUserPoint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  80,
                  82,
                  79,
                  74,
                  69,
                  67,
                  84,
                  95,
                  85,
                  83,
                  69,
                  82,
                  95,
                  80,
                  79,
                  73,
                  78,
                  84
                ];
              },
              {
                kind: "account";
                path: "task.project_id";
                account: "taskAccount";
              },
              {
                kind: "account";
                path: "github_account.wallet";
                account: "githubAccount";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "taskId";
          type: "string";
        },
        {
          name: "github";
          type: "string";
        },
        {
          name: "points";
          type: "u32";
        },
        {
          name: "taskBump";
          type: "u8";
        },
        {
          name: "githubBump";
          type: "u8";
        },
        {
          name: "walletBump";
          type: "u8";
        }
      ];
    },
    {
      name: "createProject";
      discriminator: [148, 219, 181, 42, 221, 114, 145, 190];
      accounts: [
        {
          name: "feeAndRentPayer";
          writable: true;
          signer: true;
        },
        {
          name: "project";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [80, 82, 79, 74, 69, 67, 84];
              },
              {
                kind: "arg";
                path: "projectId";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "projectId";
          type: "string";
        },
        {
          name: "name";
          type: "string";
        }
      ];
    },
    {
      name: "createTask";
      discriminator: [194, 80, 6, 180, 232, 127, 48, 171];
      accounts: [
        {
          name: "feeAndRentPayer";
          writable: true;
          signer: true;
        },
        {
          name: "task";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [84, 65, 83, 75];
              },
              {
                kind: "arg";
                path: "taskId";
              }
            ];
          };
        },
        {
          name: "project";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [80, 82, 79, 74, 69, 67, 84];
              },
              {
                kind: "arg";
                path: "projectId";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "taskId";
          type: "string";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "projectId";
          type: "string";
        },
        {
          name: "projectBump";
          type: "u8";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "feeAndRentPayer";
          writable: true;
          signer: true;
        },
        {
          name: "authority";
          signer: true;
        },
        {
          name: "adminConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  80,
                  82,
                  69,
                  70,
                  73,
                  88
                ];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "linkWallet";
      discriminator: [86, 92, 31, 146, 228, 51, 209, 230];
      accounts: [
        {
          name: "feeAndRentPayer";
          writable: true;
          signer: true;
        },
        {
          name: "adminConfig";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  65,
                  68,
                  77,
                  73,
                  78,
                  95,
                  67,
                  79,
                  78,
                  70,
                  73,
                  71,
                  95,
                  80,
                  82,
                  69,
                  70,
                  73,
                  88
                ];
              }
            ];
          };
        },
        {
          name: "walletAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [87, 65, 76, 76, 69, 84];
              },
              {
                kind: "arg";
                path: "wallet";
              }
            ];
          };
        },
        {
          name: "githubAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [71, 73, 84, 72, 85, 66];
              },
              {
                kind: "arg";
                path: "github";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "wallet";
          type: "pubkey";
        },
        {
          name: "github";
          type: "string";
        },
        {
          name: "adminConfigBump";
          type: "u8";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "adminConfigAccount";
      discriminator: [146, 83, 3, 83, 20, 231, 147, 20];
    },
    {
      name: "githubAccount";
      discriminator: [238, 164, 204, 82, 209, 140, 221, 234];
    },
    {
      name: "projectAccount";
      discriminator: [179, 110, 82, 178, 208, 35, 171, 116];
    },
    {
      name: "projectUserPointAccount";
      discriminator: [77, 255, 210, 1, 183, 110, 196, 205];
    },
    {
      name: "taskAccount";
      discriminator: [235, 32, 10, 23, 81, 60, 170, 203];
    },
    {
      name: "walletAccount";
      discriminator: [158, 98, 171, 153, 212, 64, 242, 213];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "invalidAuthority";
      msg: "Invalid authority";
    }
  ];
  types: [
    {
      name: "adminConfigAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lastBlockTimestamp";
            type: "i64";
          },
          {
            name: "authority";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "githubAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "wallet";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "projectAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "projectId";
            type: "string";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "participaints";
            type: {
              vec: "pubkey";
            };
          }
        ];
      };
    },
    {
      name: "projectUserPointAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "userPoint";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "taskAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "taskId";
            type: "string";
          },
          {
            name: "name";
            type: "string";
          },
          {
            name: "completed";
            type: "bool";
          },
          {
            name: "projectId";
            type: "string";
          },
          {
            name: "projectBump";
            type: "u8";
          },
          {
            name: "taskCompleter";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "walletAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "github";
            type: "string";
          },
          {
            name: "userPoint";
            type: "u32";
          },
          {
            name: "completedTasks";
            type: {
              vec: "string";
            };
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "projectPrefix";
      type: "string";
      value: '"PROJECT"';
    }
  ];
};
