/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/youbet_solana_program.json`.
 */
export type YoubetSolanaProgram = {
  "address": "CuuiWq1ATi8XUgnv8tdiYNQKccs3iNw2uz9CDAZeuc15",
  "metadata": {
    "name": "youbetSolanaProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "changeAdminConfig",
      "discriminator": [
        196,
        205,
        160,
        9,
        93,
        88,
        4,
        65
      ],
      "accounts": [
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "adminConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "newAdmin",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "claimReward",
      "discriminator": [
        149,
        95,
        181,
        242,
        94,
        90,
        158,
        162
      ],
      "accounts": [
        {
          "name": "feeAndRentPayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "donatePool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  68,
                  79,
                  78,
                  65,
                  84,
                  69,
                  95,
                  80,
                  79,
                  79,
                  76
                ]
              }
            ]
          }
        },
        {
          "name": "reward",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  82,
                  69,
                  87,
                  65,
                  82,
                  68
                ]
              },
              {
                "kind": "account",
                "path": "feeAndRentPayer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "donatePoolBump",
          "type": "u8"
        },
        {
          "name": "rewardBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "confirmTask",
      "discriminator": [
        168,
        184,
        67,
        118,
        227,
        95,
        112,
        166
      ],
      "accounts": [
        {
          "name": "feeAndRentPayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "task",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  65,
                  83,
                  75
                ]
              },
              {
                "kind": "arg",
                "path": "taskId"
              }
            ]
          }
        },
        {
          "name": "project",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  80,
                  82,
                  79,
                  74,
                  69,
                  67,
                  84
                ]
              },
              {
                "kind": "account",
                "path": "task.project_id",
                "account": "taskAccount"
              }
            ]
          }
        },
        {
          "name": "githubAccount",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  73,
                  84,
                  72,
                  85,
                  66
                ]
              },
              {
                "kind": "arg",
                "path": "github"
              }
            ]
          }
        },
        {
          "name": "walletAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  87,
                  65,
                  76,
                  76,
                  69,
                  84
                ]
              },
              {
                "kind": "account",
                "path": "github_account.wallet",
                "account": "githubAccount"
              }
            ]
          }
        },
        {
          "name": "projectUserPoint",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                ]
              },
              {
                "kind": "account",
                "path": "task.project_id",
                "account": "taskAccount"
              },
              {
                "kind": "account",
                "path": "github_account.wallet",
                "account": "githubAccount"
              }
            ]
          }
        },
        {
          "name": "reward",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  82,
                  69,
                  87,
                  65,
                  82,
                  68
                ]
              },
              {
                "kind": "account",
                "path": "github_account.wallet",
                "account": "githubAccount"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "taskId",
          "type": "string"
        },
        {
          "name": "github",
          "type": "string"
        },
        {
          "name": "points",
          "type": "u32"
        },
        {
          "name": "taskBump",
          "type": "u8"
        },
        {
          "name": "githubBump",
          "type": "u8"
        },
        {
          "name": "walletBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "createProject",
      "discriminator": [
        148,
        219,
        181,
        42,
        221,
        114,
        145,
        190
      ],
      "accounts": [
        {
          "name": "feeAndRentPayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "project",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  80,
                  82,
                  79,
                  74,
                  69,
                  67,
                  84
                ]
              },
              {
                "kind": "arg",
                "path": "projectId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "projectId",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "createTask",
      "discriminator": [
        194,
        80,
        6,
        180,
        232,
        127,
        48,
        171
      ],
      "accounts": [
        {
          "name": "feeAndRentPayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "task",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  84,
                  65,
                  83,
                  75
                ]
              },
              {
                "kind": "arg",
                "path": "taskId"
              }
            ]
          }
        },
        {
          "name": "project",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  80,
                  82,
                  79,
                  74,
                  69,
                  67,
                  84
                ]
              },
              {
                "kind": "arg",
                "path": "projectId"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "taskId",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "projectId",
          "type": "string"
        },
        {
          "name": "projectBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "donateToProject",
      "discriminator": [
        75,
        130,
        147,
        67,
        230,
        36,
        223,
        178
      ],
      "accounts": [
        {
          "name": "feeAndRentPayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "project",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  80,
                  82,
                  79,
                  74,
                  69,
                  67,
                  84
                ]
              },
              {
                "kind": "arg",
                "path": "projectId"
              }
            ]
          }
        },
        {
          "name": "donatePool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  68,
                  79,
                  78,
                  65,
                  84,
                  69,
                  95,
                  80,
                  79,
                  79,
                  76
                ]
              }
            ]
          }
        },
        {
          "name": "projectUserPoint1",
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                ]
              },
              {
                "kind": "arg",
                "path": "projectId"
              },
              {
                "kind": "arg",
                "path": "account1"
              }
            ]
          }
        },
        {
          "name": "projectUserPoint2",
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                ]
              },
              {
                "kind": "arg",
                "path": "projectId"
              },
              {
                "kind": "arg",
                "path": "account2"
              }
            ]
          }
        },
        {
          "name": "projectUserPoint3",
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                ]
              },
              {
                "kind": "arg",
                "path": "projectId"
              },
              {
                "kind": "arg",
                "path": "account3"
              }
            ]
          }
        },
        {
          "name": "reward1",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  82,
                  69,
                  87,
                  65,
                  82,
                  68
                ]
              },
              {
                "kind": "arg",
                "path": "account1"
              }
            ]
          }
        },
        {
          "name": "reward2",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  82,
                  69,
                  87,
                  65,
                  82,
                  68
                ]
              },
              {
                "kind": "arg",
                "path": "account2"
              }
            ]
          }
        },
        {
          "name": "reward3",
          "writable": true,
          "optional": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  82,
                  69,
                  87,
                  65,
                  82,
                  68
                ]
              },
              {
                "kind": "arg",
                "path": "account3"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "value",
          "type": "u64"
        },
        {
          "name": "projectId",
          "type": "string"
        },
        {
          "name": "projectBump",
          "type": "u8"
        },
        {
          "name": "donatePoolBump",
          "type": "u8"
        },
        {
          "name": "account1",
          "type": "pubkey"
        },
        {
          "name": "rewardBump1",
          "type": "u8"
        },
        {
          "name": "projectUserPointBump1",
          "type": "u8"
        },
        {
          "name": "account2",
          "type": "pubkey"
        },
        {
          "name": "rewardBump2",
          "type": "u8"
        },
        {
          "name": "projectUserPointBump2",
          "type": "u8"
        },
        {
          "name": "account3",
          "type": "pubkey"
        },
        {
          "name": "rewardBump3",
          "type": "u8"
        },
        {
          "name": "projectUserPointBump3",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "feeAndRentPayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "authority",
          "signer": true
        },
        {
          "name": "adminConfig",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "donatePool",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  68,
                  79,
                  78,
                  65,
                  84,
                  69,
                  95,
                  80,
                  79,
                  79,
                  76
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "linkWallet",
      "discriminator": [
        86,
        92,
        31,
        146,
        228,
        51,
        209,
        230
      ],
      "accounts": [
        {
          "name": "feeAndRentPayer",
          "writable": true,
          "signer": true
        },
        {
          "name": "adminConfig",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
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
                  71
                ]
              }
            ]
          }
        },
        {
          "name": "walletAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  87,
                  65,
                  76,
                  76,
                  69,
                  84
                ]
              },
              {
                "kind": "arg",
                "path": "wallet"
              }
            ]
          }
        },
        {
          "name": "githubAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  71,
                  73,
                  84,
                  72,
                  85,
                  66
                ]
              },
              {
                "kind": "arg",
                "path": "github"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "wallet",
          "type": "pubkey"
        },
        {
          "name": "github",
          "type": "string"
        },
        {
          "name": "adminConfigBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "adminConfigAccount",
      "discriminator": [
        146,
        83,
        3,
        83,
        20,
        231,
        147,
        20
      ]
    },
    {
      "name": "donatePoolAccount",
      "discriminator": [
        37,
        188,
        10,
        92,
        44,
        33,
        221,
        69
      ]
    },
    {
      "name": "githubAccount",
      "discriminator": [
        238,
        164,
        204,
        82,
        209,
        140,
        221,
        234
      ]
    },
    {
      "name": "projectAccount",
      "discriminator": [
        179,
        110,
        82,
        178,
        208,
        35,
        171,
        116
      ]
    },
    {
      "name": "projectUserPointAccount",
      "discriminator": [
        77,
        255,
        210,
        1,
        183,
        110,
        196,
        205
      ]
    },
    {
      "name": "rewardAccount",
      "discriminator": [
        225,
        81,
        31,
        253,
        84,
        234,
        171,
        129
      ]
    },
    {
      "name": "taskAccount",
      "discriminator": [
        235,
        32,
        10,
        23,
        81,
        60,
        170,
        203
      ]
    },
    {
      "name": "walletAccount",
      "discriminator": [
        158,
        98,
        171,
        153,
        212,
        64,
        242,
        213
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidAuthority",
      "msg": "Invalid authority"
    },
    {
      "code": 6001,
      "name": "valueLessZero",
      "msg": "Value less zero"
    }
  ],
  "types": [
    {
      "name": "adminConfigAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lastBlockTimestamp",
            "type": "i64"
          },
          {
            "name": "authority",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "donatePoolAccount",
      "type": {
        "kind": "struct",
        "fields": []
      }
    },
    {
      "name": "githubAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "projectAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "projectId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "totalProjectPoints",
            "type": "u32"
          },
          {
            "name": "participaints",
            "type": {
              "vec": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "projectUserPointAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userPoint",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "rewardAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "rewardAmount",
            "type": "u64"
          },
          {
            "name": "accumulatedAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "taskAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "taskId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "completed",
            "type": "bool"
          },
          {
            "name": "projectId",
            "type": "string"
          },
          {
            "name": "projectBump",
            "type": "u8"
          },
          {
            "name": "taskCompleter",
            "type": "pubkey"
          }
        ]
      }
    },
    {
      "name": "walletAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "github",
            "type": "string"
          },
          {
            "name": "userPoint",
            "type": "u32"
          },
          {
            "name": "completedTasks",
            "type": {
              "vec": "string"
            }
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "projectPrefix",
      "type": "string",
      "value": "\"PROJECT\""
    },
    {
      "name": "rewardPrefix",
      "type": "string",
      "value": "\"REWARD\""
    }
  ]
};
